---
type: professional
title: 'Senior Backend Programmer'
start: '2023-01-18'
end: 'Present'
company: Alten Spain
location: Madrid, Spain
people: 4
---
- Development of **Dockerized Azure Functions (Python)** for the client (a regional government) integrated with **Artificial Intelligence on Azure** for the processing of subsidies
	- Took on the leadership role after our Team Lead left on parental leave
	- Implementation of the process from the incoming request to the storage of data and documents
	- Classification of and data extraction from documents using **Azure Document Intelligence**, **Azure Custom Vision**, **Azure OpenAI** (multimodal models)
	- Ample use of **Pydantic** for data validation, overriding its internals for custom, advanced behavior
	- Combination of HTTP- and Queue-triggered functions for our complete workflow using **Azure Storage Queues**
	- Retrieval of secrets from **Azure Key Vault**
	- Document storage in **Azure Blob Storage**
	- Results storage in **Azure CosmosDB**
	- Chatbot to help the user understand the results via RAG based on **Azure AI Foundry**, **Azure AI Search**, and **Langchain**
	- Testing with **pytest**
	- Eventual migration of the monolithic code into multiple **microservices**
		- Libraries, implemented in **Docker** with **uv**, originally hosted in **Azure Artifacts** moved to **AWS CodeArtifact**
		- CI/CD moved from **Azure DevOps** to **Bitbucket**
		- Infrastructure via **Terraform** and checked with **Lacework**

- **Backend development** for the client (Immfly, an entertainment platform provider for airlines)
	- Feature additions and improvements, bug fixes, code cleanup and standarization for their **Django** app
		- Eg. implemented a quality control process that receives customer comments, attempts automatic diagnostics and repair of the database, and reports back (email, Mattermost)
	- Storage and retrieval of **multimedia** content (videos, images, audio) from **Amazon AWS S3**
	- Extensive use of **pydantic** validators when accepting csv and xlsx files from external companies
	- Migration of unittests to **pytest** and improvements in their testing strategy
	- Heavy use of **celery** tasks (including base tasks to standardize behavior) and some cronjobs
	- Creation of endpoints in **Django Rest Framework** to return content metadata
	- Downloading files from an external **SFTP** and upload to the client's platform
	- Use of **gitlab pipelines** to run scripts in the cloud environments (ie. the airplanes)
	- Execution in **kubernetes** pods (via kubectl as well as the web UI)
	- Development, testing, and debugging inside **DevContainer** for their multi-stage Dockerfile and Docker Compose setup
	- Handling of Jira tickets and generation of documentation in Confluence

- **Backend development** and **CI/CD for the frontend** for the client's (Holaluz, a Spanish solar installer) website and Android and iOS apps
	- **ExpressJS (NodeJS)** server with **Typescript** deployed to AWS
	- **CI/CD** pipelines integrating GitHub Actions and Codemagic.io to deploy the **Ionic Vue** apps to the Google and Apple Stores

- **Business process automation** for the client, Holaluz
	- Maintained and extended **UiPath** bots
	- Pioneered the use of **Robocorp (Python)** in the client
		- Setting up AWS EC2 instances as workers
		- Management of Robocorp's Control Room (ie. Orchestrator)
		- Migration of UiPath bots
	- **Web automation** (Playwright)
		- Signing in with **digital certificates** (RedTrust)
		- Interactions with forms and download/upload of files, interfacing with government websites and client’s CRM and file-sharing platform (Zoho)
	- Desktop automation: interaction with Java-based apps for digital certificates (AutoFirma) and PDF viewers that did not respond well to browser actions
	- Email and Slack automation for **reports and alerts**
	- CI/CD: **GitHub Actions** pipeline including testing and deployment to Robocorp's Control Room
	- Some Terraform and IaC experience to expand EC2 disk space or repository owners
	- Setting up an Automations CoE in the client from the ground up, as well as a Governance Service
		- Development of **internal libraries**
			- General utilities library for use in various projects: a template for web automations, interactions with Excel, Google Sheets, Google Drive, the OS filesystem, etc.
			- Library to interact with Zoho, ie. the client's CRM, file-sharing drive, and analytics module, via the web browser
		- Development of **internal tools and templates**
			- A template to standardize the Producer-Consumer dynamic (similar to UiPath's REFramework) as well as many QoL improvements (eg. automatic field validation, error reporting)
			- A tool to update an existing project to the newest version of the template via **PowerShell** scripts
			- A tool to simultaneously update multiple project's dependencies via Turbolift (similar to UiPath's Mass Dependency Update tool)
		- Bringing together and mentoring the members of various departments in the client, and tutoring of junior consultants
		- Development of an automated "checklist" to help govern and control infrastructure and automations across the company (eg. Python and powershell scripts to clean up storage space in the EC2)