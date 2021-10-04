import {
  BastionHostLinux,
  CfnEIP,
  DefaultInstanceTenancy,
  FlowLog,
  FlowLogDestination,
  FlowLogTrafficType,
  Peer,
  SubnetType,
  Vpc,
} from '@aws-cdk/aws-ec2'
import { FlowLogResourceType } from '@aws-cdk/aws-ec2/lib/vpc-flow-logs'
import { Role, ServicePrincipal } from '@aws-cdk/aws-iam'
import { LogGroup, RetentionDays } from '@aws-cdk/aws-logs'
import { Asset } from '@aws-cdk/aws-s3-assets'
import { Construct, Stack, StackProps } from '@aws-cdk/core'
import { StackConfiguration } from '../../config'
import { join } from 'path'

export class CoreNetworkStack extends Stack {
  public readonly vpc: Vpc
  public readonly flowLogs: FlowLog
  public readonly bastion: BastionHostLinux
  public readonly elasticIP: CfnEIP

  constructor(
    scope: Construct,
    id: string,
    props: StackProps,
    stackConig: StackConfiguration
  ) {
    super(scope, id, props)

    this.vpc = new Vpc(this, 'vpc', {
      cidr: stackConig.network.vpc.cidr,
      maxAzs: stackConig.network.vpc.maxAzs,
      defaultInstanceTenancy: DefaultInstanceTenancy.DEFAULT,
      subnetConfiguration: stackConig.network.vpc.subnets,
    })

    this.flowLogs = new FlowLog(this, 'flow-logs', {
      resourceType: FlowLogResourceType.fromVpc(this.vpc),
      trafficType: FlowLogTrafficType.ALL,
      destination: FlowLogDestination.toCloudWatchLogs(
        new LogGroup(this, 'flow-logs-log-group', {
          retention: RetentionDays.FIVE_DAYS,
        }),
        new Role(this, 'flow-logs-role', {
          roleName: `${stackConig.stage}-flow-logs-role`,
          assumedBy: new ServicePrincipal('vpc-flow-logs.amazonaws.com'),
        })
      ),
    })

    this.bastion = new BastionHostLinux(this, 'bastion-host', {
      instanceName: `${stackConig.stage}-bastion-host`,
      vpc: this.vpc,
      subnetSelection: this.vpc.selectSubnets({
        subnetType: SubnetType.PUBLIC,
      }),
    })

    this.elasticIP = new CfnEIP(this, 'bastion-elastic-ip', {
      instanceId: this.bastion.instanceId,
    })

    stackConig.network.permittedIps?.forEach((permittedIp) =>
      this.bastion.allowSshAccessFrom(Peer.ipv4(permittedIp.ipAddress))
    )

    const accountAsset = new Asset(this, 'bastion-accounts-asset', {
      path: join(__dirname, '/assets'),
    })

    accountAsset.grantRead(this.bastion.instance)

    const accountLocalPath =
      this.bastion.instance.userData.addS3DownloadCommand({
        bucket: accountAsset.bucket,
        bucketKey: accountAsset.s3ObjectKey,
      })

    this.bastion.instance.userData.addCommands(
      `unzip ${accountLocalPath} -d /tmp/asset/accounts`,
      'sudo /bin/bash /tmp/asset/accounts/configure.sh'
    )
  }
}
