package org.mskcc.cbio.oncokb.config.application;

import org.apache.commons.lang3.StringUtils;
import org.mskcc.cbio.oncokb.domain.enumeration.ProjectProfile;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Properties specific to Oncokb.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {
    private String name;
    private String apiProxyUrl;
    private String userRegistrationWebhook;
    private ProjectProfile profile;
    private Boolean sitemapEnabled;
    private RedisProperties redis;
    private String accountApprovalWhitelist;
    private String academicEmailClarifyDomain;
    private String licensedDomains;
    private String trialedDomains;
    private String googleWebmasterVerification;
    private EmailAddresses emailAddresses;
    private String tokenUsageCheck;
    private String tokenUsageCheckWhitelist;
    private int publicWebsiteApiThreshold;
    private FrontendProperties frontend;
    private AWSProperties aws;
    private String githubToken;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getApiProxyUrl() {
        return apiProxyUrl;
    }

    public void setApiProxyUrl(String apiProxyUrl) {
        this.apiProxyUrl = apiProxyUrl;
    }

    public String getUserRegistrationWebhook() {
        return userRegistrationWebhook;
    }

    public void setUserRegistrationWebhook(String userRegistrationWebhook) {
        this.userRegistrationWebhook = userRegistrationWebhook;
    }

    public String getAccountApprovalWhitelist() {
        return accountApprovalWhitelist;
    }

    public void setAccountApprovalWhitelist(String accountApprovalWhitelist) {
        this.accountApprovalWhitelist = accountApprovalWhitelist;
    }

    public String getAcademicEmailClarifyDomain() {
        return academicEmailClarifyDomain;
    }

    public void setAcademicEmailClarifyDomain(String academicEmailClarifyDomain) {
        this.academicEmailClarifyDomain = academicEmailClarifyDomain;
    }

    public String getLicensedDomains() {
        return licensedDomains;
    }

    public void setLicensedDomains(String licensedDomains) {
        this.licensedDomains = licensedDomains;
    }

    public String getTrialedDomains() {
        return trialedDomains;
    }

    public void setTrialedDomains(String trialedDomains) {
        this.trialedDomains = trialedDomains;
    }

    public ProjectProfile getProfile() {
        return profile;
    }

    public void setProfile(ProjectProfile profile) {
        this.profile = profile;
    }

    public Boolean getSitemapEnabled() {
        return sitemapEnabled;
    }

    public void setSitemapEnabled(Boolean sitemapEnabled) {
        this.sitemapEnabled = sitemapEnabled;
    }

    public RedisProperties getRedis() {
        return redis;
    }

    public void setRedis(RedisProperties redis) {
        this.redis = redis;
    }

    public String getGoogleWebmasterVerification() {
        return googleWebmasterVerification;
    }

    public void setGoogleWebmasterVerification(String googleWebmasterVerification) {
        this.googleWebmasterVerification = googleWebmasterVerification;
    }

    public EmailAddresses getEmailAddresses() {
        return emailAddresses;
    }

    public void setEmailAddresses(EmailAddresses emailAddresses) {
        this.emailAddresses = emailAddresses;
    }

    public String getTokenUsageCheck() {
        return tokenUsageCheck;
    }

    public void setTokenUsageCheck(String tokenUsageCheck) {
        this.tokenUsageCheck = tokenUsageCheck;
    }

    public String getTokenUsageCheckWhitelist() {
        return tokenUsageCheckWhitelist;
    }

    public void setTokenUsageCheckWhitelist(String tokenUsageCheckWhitelist) {
        this.tokenUsageCheckWhitelist = tokenUsageCheckWhitelist;
    }

    public int getPublicWebsiteApiThreshold() {
        return publicWebsiteApiThreshold;
    }

    public void setPublicWebsiteApiThreshold(int publicWebsiteApiThreshold) {
        this.publicWebsiteApiThreshold = publicWebsiteApiThreshold;
    }

    public FrontendProperties getFrontend() {
        return frontend;
    }

    public void setFrontend(FrontendProperties frontend) {
        this.frontend = frontend;
    }

    public List<String> getAcademicEmailClarifyDomains() {
        return getDomains(this.getAcademicEmailClarifyDomain());
    }

    public List<String> getLicensedDomainsList() {
        return getDomains(this.getLicensedDomains());
    }
    public List<String> getTrialedDomainsList() {
        return getDomains(this.getTrialedDomains());
    }

    private List<String> getDomains(String domainStr) {
        if (StringUtils.isEmpty(domainStr)) {
            return new ArrayList<>();
        }
        return Arrays.stream(domainStr.split(",")).map(domain -> domain.trim()).filter(domain -> !StringUtils.isEmpty(domain)).collect(Collectors.toList());
    }

    public AWSProperties getAws() {
        return aws;
    }

    public void setAws(AWSProperties aws) {
        this.aws = aws;
    }

    public String getGithubToken() {
        return githubToken;
    }

    public void setGithubToken(String githubToken) {
        this.githubToken = githubToken;
    }
}
