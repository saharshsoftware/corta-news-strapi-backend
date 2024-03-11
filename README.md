## AWS server setup
In order to start the ec2 on port 80 using pm2. We need to forward the port 80 to 3000
<code>
sudo apt-get install authbind
sudo touch /etc/authbind/byport/80
sudo chown %user% /etc/authbind/byport/80
sudo chmod 755 /etc/authbind/byport/80

vi ~/.bashrc
Add alias pm2='authbind --deep pm2'
source ~/.bashrc
pm2 update
</code>
