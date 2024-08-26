name: 'Print backend hashes'
on: 
[workflow_dispatch]
jobs:
  print-backend-sha:
    runs-on: 
    'ubuntu-latest'
 name:
 Print backend hashes
 steps:
 uses: actions/checkout@v3
 with:
path: repo
      - name:
      Run script
        working-directory:
        reporun: |
          chmod +x ./scripts/get_backend_hash.sh
          sh ./scripts/get_backend_hash.sh
