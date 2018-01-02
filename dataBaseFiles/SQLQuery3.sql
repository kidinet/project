CREATE TABLE [dbo].[Users] (
    [id]             INT          IDENTITY (1000, 2) NOT NULL,
    [firstName]      VARCHAR (20) NULL,
    [lastName]       VARCHAR (20) NULL,
    [childFirstName] VARCHAR (20) NULL,
    [childLastName]  VARCHAR (20) NULL,
    [nickname]       VARCHAR (20) NULL,
    [profile_]       VARCHAR (30) NULL,
    [mail]           VARCHAR (30) NOT NULL,
    [password_]      VARCHAR (30) NULL,
    [type_]          BIT          NULL,
    [city]           VARCHAR (20) NULL,
    [streat]         VARCHAR (20) NULL,
    [build]          INT          NULL,
    [groupId]        INT          NOT NULL,
    PRIMARY KEY CLUSTERED ([id] ASC, [groupId] ASC, [mail] ASC),
);

