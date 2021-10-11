.PHONY: start-data-services start-app destroy
start-app:
	@docker-compose up api

start-data-services:
	@docker-compose up -d mongo-express mongo_db pg_db redis pgadmin redisinsight

destroy:
	@docker-compose down -v --rmi local

destroy/start-app: destroy start-app
