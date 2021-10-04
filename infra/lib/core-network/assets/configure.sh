#!/bin/bash

for entry in *.pub; do
  if [ -f "$entry" ]; then
    username="$(basename -- "$entry" | cut -d. -f1)"

    useradd "$username"
      usermod -G wheel "$username"

      mkdir -p /home/"$username"/.ssh
      chmod 700 /home/"$username"/.ssh
      cp "$entry" /home/"$username"/.ssh/authorized_keys
      chmod 600 /home/"$username"/.ssh/authorized_keys
      chown "$username":"$username" -R /home/"$username"/
      echo "\"$username\" ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/users
  else
    echo "Warn: no accounts to add"
  fi
done
