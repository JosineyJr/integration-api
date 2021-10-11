<p align="center">
  <img src="https://nodejs.dev/static/nodejs-logo-light-mode-e8344f71081da53be8ee1098584a0ab6.svg" width="80px"/>
  <br>
  <img src="https://buttercms.com/static/images/tech_banners/ExpressJS.8587dd0647ca.png" width="120px"/>

</p>
<div align=center>
    <a href="#desc">Description</a> | <a href="#prerequisites">Prerequisites</a> | <a href="#running">Running</a> | <a href="#endpoints">Endpoints</a> | <a href="#principles">Principles</a> | <a href="#designPatterns">Design Patterns</a> | <a href="#methodologiesDesigns">Methodologies & Designs</a> | <a href="#librariesFrameworks">Libraries and Frameworks</a>
</div>
<br>
<hr>
<h2 id="desc">
    Description
</h2>

Restful API unsing [Node.js](https://nodejs.org/en/) and [express](https://www.npmjs.com/package/express) framework
- - -
<h2 id="prerequisites">
  Prerequisites
</h2>


- [Git](https://git-scm.com/download/), [Docker](https://docs.docker.com/get-docker/) and [Docker-Compose](https://docs.docker.com/compose/install/) installed.
- - - -
<h2 id="running">
  Running the project
</h2>

All commands below are done in the terminal


**1** - Clone the repository and access the directory created by the clone:

```sh
https://github.com/JosineyJr/PipeDrive-Bling-Integration-API && cd PipeDrive-Bling-Integration-API
```

**2** - Start the application:

```sh
make start-app
```

 - - - -
<h2 id="endpoints">
 Endpoints
</h2>


1.  ***POST*** `api/integration`
    - Executes the integration.
2.  ***GET*** `api/collections/pedidos`
    - Retrieves consolidated data from MongoDB collection.
- - - -

<h2 id="principles">
 Principles
</h2>

* Single Responsibility Principle (SRP)
* Open Closed Principle (OCP)
* Liskov Substitution Principle (LSP)
* Interface Segregation Principle (ISP)
* Dependency Inversion Principle (DIP)
* Separation of Concerns (SOC)
* Don't Repeat Yourself (DRY)
* You Aren't Gonna Need It (YAGNI)
* Keep It Simple, Silly (KISS)
* Composition Over Inheritance

- - -

<h2 id="designPatterns">
 Design Patterns
</h2>

* Factory
* Adapter
* Composite
* Decorator
* Proxy
* Dependency Injection
* Abstract Server
* Composition Root
* Builder
* Singleton

- - -

<h2 id="methodologiesDesigns">
 Methodologies and Designs
</h2>

* Clean Architecture
* DDD
* Modular Design
* Use Cases

- - -

<h2 id="librariesFrameworks">
 Libraries and Frameworks
</h2>

* NPM
* Typescript
* Git
* Docker
* MongoDb
* Postgres
* Bcrypt
* JsonWebToken
* Validator
* Express
* Axios
* Eslint
* Rimraf
* Redis
* Bull
* Fast xml parser
