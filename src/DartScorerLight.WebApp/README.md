# Dart Scorer Light Service

> ASP.NET Core 2.2 WEB API Dart Scorer Light Service


## Table of Contents

- [Installation](#installation)

---
## Example

```C#
Code
```
---

## Installation

- Important settings for `*.csproj` file:
```
  <PropertyGroup>
    <TargetFramework>netcoreapp2.2</TargetFramework>
    <RuntimeIdentifier>win7-x64</RuntimeIdentifier>
    <SelfContained>false</SelfContained>
    <IsTransformWebConfigDisabled>true</IsTransformWebConfigDisabled>
	...
  </PropertyGroup>
```

- Initialize/Create/Update SQLite Database (file)
```
dotnet ef migrations add CreateDatabase
dotnet ef database update
```


- Create Service: (Attention: This will not work from powershell.)
> Example:
> sc create MyService binPath= "c:\svc\sampleapp.exe" obj= "{DOMAIN}\ServiceUser" password= "{PASSWORD}"
```
sc create DartScorerLight binPath= "C:\Services\DartScorerLight\DartScorerLight.WebApp.exe" displayname= "Dart Scorer Light WebApp"
sc description DartScorerLight "Dart Scoreboard Service. ASP.NET Core 2.2 | Port: 5000"
```