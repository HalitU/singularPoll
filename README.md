# Singular Poll

A poll application page made with React and ASP.NET Core. SignalR is used for hub communication between clients. A dotnet api service is written for database calls from react. On react side axios is being used for API calls.

Since user information is not a part of the project all polls and votes are anonymous for now.

## How to install

Under baseService directory:

```
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
```

```
dotnet restore
```

```
dotnet ef migrations add InitialCreate
dotnet ef database update
```

```
dotnet run
```

Under pollApp directory:

```
npm install
```

```
npm start
```
## Examples

### Creating a new poll.

![](exampleVisuals/formExample.gif)

### Opening up an already existing poll

![](exampleVisuals/existingExample.gif)

### Voting

![](exampleVisuals/voteExample.gif)

### Commenting

![](exampleVisuals/commentExample.gif)