/*
  Warnings:

  - You are about to drop the column `AboutSectionCode` on the `AboutSection` table. All the data in the column will be lost.
  - You are about to drop the column `educationSectionCode` on the `EducationSection` table. All the data in the column will be lost.
  - You are about to drop the column `experienceSectionCode` on the `ExperienceSection` table. All the data in the column will be lost.
  - You are about to drop the column `welcomeCode` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `projectSectionCode` on the `ProjectSection` table. All the data in the column will be lost.
  - You are about to drop the column `skillSectionCode` on the `SkillSection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AboutSection" DROP COLUMN "AboutSectionCode";

-- AlterTable
ALTER TABLE "EducationSection" DROP COLUMN "educationSectionCode";

-- AlterTable
ALTER TABLE "ExperienceSection" DROP COLUMN "experienceSectionCode";

-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "welcomeCode";

-- AlterTable
ALTER TABLE "ProjectSection" DROP COLUMN "projectSectionCode";

-- AlterTable
ALTER TABLE "SkillSection" DROP COLUMN "skillSectionCode";
