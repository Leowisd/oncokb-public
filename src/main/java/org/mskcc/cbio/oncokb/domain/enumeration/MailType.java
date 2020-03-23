package org.mskcc.cbio.oncokb.domain.enumeration;

/**
 * The MailType enumeration.
 */
public enum MailType {
    ACTIVATION("activationEmail", "User Activation", null)
    , APPROVAL("approvalEmail", "User Approval", null)
    , CREATION("creationEmail", "Account Creation", null)
    , PASSWORD_RESET("passwordResetEmail", "Reset Password", null)
    , LICENSE_REVIEW_COMMERCIAL("licenseReview", "License Review - Commercial", null)
    , LICENSE_REVIEW_RESEARCH_COMMERCIAL("licenseReview", "License Review - Research in Commercial", null)
    , LICENSE_REVIEW_HOSPITAL("licenseReview", "License Review - Hospital", null)
    , SEND_INTAKE_FORM_COMMERCIAL("sendIntakeForm", "Send Intake Form - Commercial", "OncoKB_License_Intake_Form_01_23_2020.docx")
    , SEND_INTAKE_FORM_RESEARCH_COMMERCIAL("sendIntakeForm", "Send Intake Form - Research in Commercial", "OncoKB_License_Intake_Form_01_23_2020.docx")
    , SEND_INTAKE_FORM_HOSPITAL("sendIntakeForm", "Send Intake Form - Hospital", "OncoKB_License_Intake_Form_01_23_2020.docx")
    , CLARIFY_ACADEMIC_FOR_PROFIT("clarifyLicenseInForProfileCompany", "Clarify - Requested academic license from a for-profit company", null)
    , CLARIFY_ACADEMIC_NON_INSTITUTE_EMAIL("clarifyAcademicUseWithoutInstituteEmail", "Clarify - Requested academic license from a non-institute email", null)
    , TEST("testEmail", "Test", null)
    ;

    String templateName;
    String description;
    String attachmentFileNames;

    MailType(String templateName, String description, String attachmentFileNames) {
        this.templateName = templateName;
        this.description = description;
        this.attachmentFileNames = attachmentFileNames;
    }

    public String getTemplateName() {
        return templateName;
    }

    public String getDescription() {
        return description;
    }

    public String getAttachmentFileNames() {
        return attachmentFileNames;
    }
}