-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userHeading" TEXT NOT NULL,
    "userBio" TEXT NOT NULL,
    "userResumeLink" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userGithubId" TEXT NOT NULL,
    "welcomeCode" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutSection" (
    "id" TEXT NOT NULL,
    "aboutHeading" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "AboutSectionCode" TEXT NOT NULL,
    "portfolioId" TEXT,

    CONSTRAINT "AboutSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectSection" (
    "id" TEXT NOT NULL,
    "projectHeading" TEXT NOT NULL,
    "portfolioId" TEXT,
    "projectSectionCode" TEXT NOT NULL,

    CONSTRAINT "ProjectSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectHeading" TEXT NOT NULL,
    "projectDescription" TEXT NOT NULL,
    "techStack" TEXT[],
    "features" TEXT[],
    "challenges" TEXT[],
    "learnings" TEXT[],
    "githubLink" TEXT NOT NULL,
    "deployedLink" TEXT,
    "projectSectionId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillSection" (
    "id" TEXT NOT NULL,
    "skillHeading" TEXT NOT NULL,
    "skillDescription" TEXT NOT NULL,
    "skillSectionCode" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,

    CONSTRAINT "SkillSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "skillIcon" TEXT NOT NULL,
    "skillName" TEXT NOT NULL,
    "skillIconColor" TEXT NOT NULL,
    "skillSectionId" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceSection" (
    "id" TEXT NOT NULL,
    "experienceHeading" TEXT NOT NULL,
    "experienceDescription" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "experienceSectionCode" TEXT NOT NULL,

    CONSTRAINT "ExperienceSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "experienceName" TEXT NOT NULL,
    "joiningDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "experienceDescription" TEXT NOT NULL,
    "experienceSectionId" TEXT NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationSection" (
    "id" TEXT NOT NULL,
    "educationHeading" TEXT NOT NULL,
    "educationDescription" TEXT NOT NULL,
    "educationSectionCode" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,

    CONSTRAINT "EducationSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "educationName" TEXT NOT NULL,
    "joiningDate" TEXT NOT NULL,
    "educationDescription" TEXT NOT NULL,
    "educationSectionId" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_userId_key" ON "Portfolio"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AboutSection_portfolioId_key" ON "AboutSection"("portfolioId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectSection_portfolioId_key" ON "ProjectSection"("portfolioId");

-- CreateIndex
CREATE INDEX "Project_projectName_projectDescription_idx" ON "Project"("projectName", "projectDescription");

-- CreateIndex
CREATE UNIQUE INDEX "SkillSection_portfolioId_key" ON "SkillSection"("portfolioId");

-- CreateIndex
CREATE UNIQUE INDEX "ExperienceSection_portfolioId_key" ON "ExperienceSection"("portfolioId");

-- CreateIndex
CREATE UNIQUE INDEX "EducationSection_portfolioId_key" ON "EducationSection"("portfolioId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AboutSection" ADD CONSTRAINT "AboutSection_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSection" ADD CONSTRAINT "ProjectSection_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_projectSectionId_fkey" FOREIGN KEY ("projectSectionId") REFERENCES "ProjectSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillSection" ADD CONSTRAINT "SkillSection_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_skillSectionId_fkey" FOREIGN KEY ("skillSectionId") REFERENCES "SkillSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceSection" ADD CONSTRAINT "ExperienceSection_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_experienceSectionId_fkey" FOREIGN KEY ("experienceSectionId") REFERENCES "ExperienceSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationSection" ADD CONSTRAINT "EducationSection_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_educationSectionId_fkey" FOREIGN KEY ("educationSectionId") REFERENCES "EducationSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
