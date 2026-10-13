# Ansible deployment notes

This playbook targets a Debian/Ubuntu Linux host and expects the project files
to be present on that host in `project_path` (default `/opt/agrismart`).

Prerequisites:
- Ansible installed on the control machine
- SSH access and sudo privileges on the target Linux host
- Docker Python SDK on the managed host where required by the collection
- `community.docker` collection: `ansible-galaxy collection install community.docker`

Example:
1. Copy the whole project folder to the target host at `/opt/agrismart`.
2. Copy `inventory.ini.example` to `inventory.ini` and set your actual host/user.
3. Run: `ansible-playbook -i inventory.ini deploy.yml`

Do not put passwords or private keys in the inventory file or Git repository.
This is an example playbook; validate it in a test VM before using a real server.
