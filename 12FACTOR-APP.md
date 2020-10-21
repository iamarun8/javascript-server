## 12 Factor App ##
*** Introduction ***
In the modern era, software is commonly delivered as a service: called web apps, or software-as-a-service. The twelve-factor app is a methodology for building software-as-a-service apps that:

Use declarative formats for setup automation, to minimize time and cost for new developers joining the project;
Have a clean contract with the underlying operating system, offering maximum portability between execution environments;
Are suitable for deployment on modern cloud platforms, obviating the need for servers and systems administration;
Minimize divergence between development and production, enabling continuous deployment for maximum agility;
And can scale up without significant changes to tooling, architecture, or development practices.
The twelve-factor methodology can be applied to apps written in any programming language, and which use any combination of backing services (database, queue, memory cache, etc).

*** Background ***
The contributors to this document have been directly involved in the development and deployment of hundreds of apps, and indirectly witnessed the development, operation, and scaling of hundreds of thousands of apps via our work on the Heroku platform.

This document synthesizes all of our experience and observations on a wide variety of software-as-a-service apps in the wild. It is a triangulation on ideal practices for app development, paying particular attention to the dynamics of the organic growth of an app over time, the dynamics of collaboration between developers working on the app’s codebase, and avoiding the cost of software erosion.

Our motivation is to raise awareness of some systemic problems we’ve seen in modern application development, to provide a shared vocabulary for discussing those problems, and to offer a set of broad conceptual solutions to those problems with accompanying terminology. The format is inspired by Martin Fowler’s books Patterns of Enterprise Application Architecture and Refactoring.

1. **Codebase**
One codebase tracked in revision control, many deploys

Your codebase should be tracked in a central version control system that is easily accessible to all your developers. We prefer to use Git and share all our repositories through GitHub.

There is only one codebase per app, but there will be many deploys of the app. This means that you might have deployed your application to production and to staging, for example. Both environments share the same codebase, but might be in a different state. Staging could have some commits not yet deployed to production for testing.

2. **Dependencies**
Explicitly declare and isolate dependencies

Your application might rely on external libraries and packages to run. You should never assume that these packages exist on the target system. Instead, your application must declare all dependencies and their correct version explicitly.

When working with PHP and Joomlatools Platform, we can rely on Composer to install dependencies for us. All we have to do is declare them in the composer.json manifest.

3. **Configuration**
Store config in the environment

Configuration options should never be hardcoded, for two reasons:

You do not want sensitive information like database credentials or API keys to be committed into the repository to prevent security leaks.
Your configuration varies per environment. For example, you might want to enable debugging on your local environment while this would be overkill on production.
Instead of hardcoding this information, we rely on environment variables to handle this sensitive information.

4. **Backing Services**
Treat backing services as attached resources

A backing service is one that requires a network connection to run, like MySQL or Memcached. If the location or connection details of such a service changes, you should not have to make code changes. Instead, these details should be available in the configuration.

For example, your development environment talks to a MySQL server on your local machine. On production, your database runs on another server. The only difference will be the URL to connect to in the configuration.

5. **Build, release, run**
Strictly separate build and run stages

Build, release, and run stages should be treated as completely distinct from one another:

The build stage is fully controlled by the developer. This is where we tag a new release and fix bugs.
The release stage prepares the build for execution in the target environment. In this stage, you can run tests to verify if the code behaves as intented.
The run stage executes the application and should not need any intervention.
For example, it's now impossible to make changes to the runtime. Instead, you make changes to the code in the build stage where you have total control. This reduces risk and ensures your team that everything is running well.

Automation and tooling will help to make this principle simpler. A tool like GitHub can be used to tag your latest build, while Capistrano can be used to deploy the new build to the server.

6. **Processes**
Execute the app as one or more stateless processes

Stateless applications are designed to degrade gracefully. That means if a part of your application stack fails, the app itself does not become a failure. In other words, the state of your system is completely defined by your databases and shared storage, and not by each individual running application instance.

7. **Port Binding**
Export services via port binding

Your application service should also be accessible via a URL, just as your backing services are. This enables your application to be fully self-contained.

This means you should be able to run the Joomlatools Platform using PHP's built-in webserver on your development machine, while your production server can route your domain name to the application by adding a more complicated webserver on top.

8. Concurrency
Scale out via the process model

Every process inside your application should be treated as a first-class citizen. That means that each process should be able to scale, restart, or clone itself when needed. This approach will improve the sustainability and scalability of your application as a whole.

9. **Disposability**
Maximize robustness with fast startup and graceful shutdown

When you deploy new code, you want the new version to start right away and be able to deal with incoming traffic. This principle is a natural result of the backing services and concurrency principles: after a crash or new deployment, your app should have everything it needs waiting in databases or caches. Reloading the code should only take a few seconds max.

10. **Dev/prod parity**
Keep development, staging, and production as similar as possible

Your development environment should resemble production as close as possible. That means working on the same operating system, using the same backing services and the same dependencies, and so on. This reduces the number of bugs and downtime and allows your organisation to have a much more rapid development cycle.

That's why we do all our development work on our Joomlatools Box. Not only does this resemble our production environments, but it also ensures all our developers work with the same tools.

11. **Logs**
Treat logs as event streams

Logging is important for debugging and checking up on the general health of your application. However, your application should not be concerned with the storage and management of these logs. Instead, log entries should be treated as an event stream that is routed to a separate service for archival and analysis.

Examples of such external services are New Relic or Logentries.

12. **Admin Processes**
Run admin/management tasks as one-off processes

Once your application is running in production, you'll want to do a lot of simple administrative tasks from time to time. You could need to run a database migration or fetch analytical data to gather business insights.

One-off admin processes are long-running processes that should be run in an identical environment as the regular long-running processes of the app. They run against the same live release, using the same codebase, configuration and database.

You can use our Joomlatools Console to execute one-off tasks, such as clearing the cache or re-indexing Smart Search content. To apply or rollback database migrations we make use of Phinx.