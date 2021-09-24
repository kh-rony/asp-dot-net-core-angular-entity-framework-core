CREATE DATABASE ASPDotNETCoreAngularEFCore;

// DROP DATABASE ASPDotNETCoreAngularEFCore;


USE ASPDotNETCoreAngularEFCore;


CREATE TABLE Test (
    Id INT PRIMARY KEY IDENTITY(1, 1),
    Name VARCHAR(100) NOT NULL,
    Location VARCHAR(100) DEFAULT NULL
)
GO


CREATE TABLE Building (
    Id INT PRIMARY KEY IDENTITY(1, 1),
    Name VARCHAR(100) NOT NULL,
    Location VARCHAR(100)
)
GO

CREATE TABLE Object (
    Id INT PRIMARY KEY IDENTITY(1, 1),
    Name VARCHAR(100) NOT NULL,
    BuildingId INT NOT NULL,
    FOREIGN KEY (BuildingId) REFERENCES Building (Id),
)
GO

CREATE TABLE Reading (
    Id INT PRIMARY KEY IDENTITY (1, 1),
    BuildingId INT NOT NULL,
    ObjectId INT NOT NULL,
    Value DECIMAL(18, 2) NOT NULL,
    Timestamp DATETIME,
    FOREIGN KEY (BuildingId) REFERENCES Building (Id),
    FOREIGN KEY (ObjectId) REFERENCES Object (Id)
)
GO


DELETE FROM Reading;
DBCC CHECKIDENT (Reading, RESEED, 0);


SELECT COUNT(*) FROM [ASPDotNETCoreAngularEFCore].[dbo].[Reading];


Install NuGet Packages:

Microsoft.EntityFrameworkCore
Microsoft.EntityFrameworkCore.Tools
Microsoft.EntityFrameworkCore.SqlServer
Microsoft.EntityFrameworkCore.Design
Microsoft.EntityFrameworkCore.SqlServer.Design

Microsoft.Extensions.Configuration



Run the following Command in Package Manager Console
Visual Studio Menubar > View > Other Windows > Package Manager Console

Scaffold-DbContext "server=KH-RONY-PC;database=ASPDotNETCoreAngularEFCore;uid=kh-rony;password=1234;Integrated Security=True;MultipleActiveResultSets=True;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -context "AspDotNetCoreAngularEfCoreContext" -Force


appsettings.json

"ConnectionStrings": {
    "DatabaseConnectionString": "server=KH-RONY-PC;database=ASPDotNETCoreAngularEFCore;uid=kh-rony;password=1234;Integrated Security=True;MultipleActiveResultSets=True;Trusted_Connection=True;"
},


Models > AspDotNetCoreAngularEfCoreContext

protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    if( optionsBuilder.IsConfigured ) return;
    var configuration = new ConfigurationBuilder()
        .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
        .AddJsonFile("appsettings.json")
        .Build();
    optionsBuilder.UseSqlServer(configuration.GetConnectionString("DatabaseConnectionString"));
}


ClientApp > package.json

replace the following 2 lines:

"@ngrx/effects": "^12.4.0",
"@ngrx/store": "^12.4.0",

with

"@ngrx/effects": "^10.1.2",
"@ngrx/store": "^10.1.2",
// "@ngrx/store-devtools": "^10.1.2",


ClientApp >  tsconfig.json > inside "compilerOptions" section add the following line:
 
"noImplicitAny": false


ClientApp >  tsconfig.json file should be look like this now:
{
    "compileOnSave": false,
    "compilerOptions": {
        "baseUrl": "./",
        "module": "esnext",
        "outDir": "./dist/out-tsc",
        "sourceMap": true,
        "declaration": false,
        "moduleResolution": "node",
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "target": "es2015",
        "typeRoots": [
            "node_modules/@types"
        ],
        "lib": [
            "es2017",
            "dom"
        ],
        "noImplicitAny": false
    }
}