if [$1=stop]; then
docker compose -f %~dp0/docker-compose.yml -p family-cookbook_devcontainer stop db
elif [$1=start || -z $1]; then
docker compose -f %~dp0/docker-compose.yml -p family-cookbook_devcontainer up -d db
fi
