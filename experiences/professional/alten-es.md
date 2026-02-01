---
type: professional
title: 'Senior Backend Programmer'
start: '2023-01-18'
end: 'Present'
company: Alten Spain
location: Madrid, España
people: 4
---
- Desarrollo para el cliente (el gobierno de una Comunidad Autónoma) de unas **Azure Functions (Python) dockerizadas** integrada con la **Inteligencia Artificial de Azure** para la tramitación de subvenciones
	- Asumí el liderazgo del equipo tras la baja de paternidad de nuestro Team Lead
	- Implementación del proceso desde el request hasta el almacenaje de datos y documentos
	- Classificación y extracción de datos de los documentos con **Azure Document Intelligence**, **Azure Custom Vision**, **Azure OpenAI** (modelos multimodales)
	- Uso extenso de **Pydantic** y customización de su comportamiento interno para ajustarse requerimientos particulares
	- Lectura de secretos de **Azure Key Vault**
	- Combinación de desencadenadores de tipo HTTP and de colas con **Azure Storage Queues** para completar nuestro workflow
	- Almacenaje de documentos en **Azure Blob Storage**
	- Almacenaje de resultados en **Azure CosmosDB**
	- Chatbot para ayudar al usuario a entender los resultados via RAG basado en **Azure AI Foundry**, **Azure AI Search**, y **Langchain**
	- Testing con **pytest**
	- Eventual migración del código monolítico en múltiples microservicios
		- Librerías, implementadas con **Docker** y **uv**, originalmente alojadas en **Azure Artifacts** migradas a **AWS CodeArtifact**
		- CI/CD migrado de **Azure DevOps** a **Bitbucket**
		- Infraestructura via **Terraform** y chequeada con **Lacework**

- Desarrollo del **backend** para el cliente (Immfly, una plataforma de entretenimiento para aerolíneas)
	- Mejoras y nuevas funcionalidades, correcciones de bugs, limpieza y estandarización del código de su app de **Django**
		- Eg. implementación de un proceso de control de calidad que recibe los comentarios de los clientes, intenta un diagnóstico y reparación automática, y reporta los resultados (email, Mattermost)
	- Almacenamiento y abastecimiento de **contenido multimedia** (vídeos, imágenes, audio) de **Amazon AWS S3**
	- Extenso uso de validadores de **pydantic** al aceptar los archivos csv y xlsx de empresas externas
	- Migración de unittests a **pytest** y mejoras en su estrategia de testeo
	- Amplio uso de tareas de **celery** (incluyendo "base tasks" para estandarizar el comportamiento) y algunas cronjobs
	- Creación de endpoints con **Django Rest Framework** para devolver los metadatos del contenido multimedia
	- Descarga de archivos de un servidor **SFTP** de un proveedor externo y subida la plataforma del cliente
	- Uso de **pipelines de gitlab** para ejecutar scripts en los entornos cloud (ie. los aviones)
	- Ejecución en pods de **kubernetes** (mediante kubectl así como la UI de la web)
	- Desarrollo, testeo, y depuración dentro de un **DevContainer** con un Dockerfile de tipo "multi-stage" y Docker Compose
	- Gestión de tickets en Jira y generación de documentación en Confluence

- Desarrollo del **backend** y la **CI/CD del frontend** para la web y las apps de Android e iOS del cliente (Holaluz, una instaladora de módulos fotovoltaicos)
	- Servidor **ExpressJS (NodeJS)** con **Typescript** desplegado a AWS
	- Pipelines de **CI/CD** via GitHub Actions y Codemagic.io para desplegar las apps de **Ionic Vue** a las stores de Google y Apple

- **Automatización de procesos de negocio** para el cliente, Holaluz 
	- Mantenimiento y extensión de bots de **UiPath**
	- Liderar el uso de **Robocorp (Python)** en el cliente
		- Configuración y mantenimiento de workers (instancias AWS EC2)
		- Gestión del Control Room de Robocorp (ie. Orchestrator)
		- Migración de bots de UiPath
	- **Automatización web** (Playwright)
		- Log in y firmas de documentos con **certificados digitales** (RedTrust)
		- Relleno de formularios y descarga/subida de ficheros, interactuando con páginas gubernamentales y el CRM y Drive del cliente (Zoho)
	- Automatización de escritorio: interacción con apps de Java para certificados digitales (AutoFirma) y visores de PDF que no respondían bien a las acciones del explorador web
	- Automatización de email y Slack para crear **reports y alertas**
	- CI/CD: pipeline de **GitHub Actions** para el QA y despliegue al Control Room de Robocorp
	- Algo de experiencia con Terraform e IaC para expandir el disco duro de las EC2 o los owners de los repositorios
	- Arrancar desde cero un Automations CoE en el cliente, así como un servicio de gobernanza
		- Desarrollo de **librarías internas**
			- Una librerías con funciones de uso general, comunes a varios proyectos: una plantilla para automatizaciones web, interacciones con Excel, Google Sheets, Google Drive, archivos y carpetas del OS, etc.
			- Una librería para interactuar con Zoho, ie. el CRM, Drive, y módulo de analytics del cliente, a través del explorador web
		- Desarrollo de **herramientas y plantillas internas**
			- Una plantilla para estandarizar la dinámica del Productor-Consumidor (similar al REFramework de UiPath), así como ayudas en el desarrollo de un bot típico (eg. validación automática de campos, reporting de errores)
			- Una herramienta para actualizar un bot existente a la nueva plantilla mediante scripts de **PowerShell**
			- Una herramienta para actualizar simultáneamente la misma librería utilizada en varios proyectos mediante Turbolift (similar a la Mass Dependency Update tool de UiPath)
		- Mentorización de los miembros de distintos departamentos del cliente y formaciones impartidas a consultores junior
		- Elaboración de un documento AS-IS y TO-BE de la gobernanza de las plataformas de automatización en el cliente