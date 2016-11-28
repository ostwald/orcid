<%@ include file="/TagLibIncludes.jsp" %>
<%@ taglib prefix="html" uri="/WEB-INF/tlds/struts-html.tld" %>
<%@ taglib prefix="logic" uri="/WEB-INF/tlds/struts-logic.tld" %>
<%@ taglib prefix="bean-el" uri="/WEB-INF/tlds/struts-bean-el.tld"%>
<%@ taglib prefix="html-el" uri="/WEB-INF/tlds/struts-html-el.tld" %>
<%@ taglib prefix="logic-el" uri="/WEB-INF/tlds/struts-logic-el.tld" %>
<c:set var="contextUrl"><%@ include file="/ContextUrl.jsp" %></c:set>

<!DOCTYPE html>
<html lang="en">
<!--<head  profile="http://www.w3.org/2005/10/profile">-->
<head >
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></script>
    <script src="${contextUrl}/javascript/utils.js"></script>
    <script src="config.js"></script>

    <script src="profile-model.js"></script>
    <script src="profile-script.js"></script>


    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" href="styles.css">
    <meta charset=utf-8 />
    <!--<link rel='shortcut icon' href='https://www.dropbox.com/s/80dvo44nfw1a8yo/favicon.ico?dl=0' type='image/x-icon'/ >-->

    <title>ORCID Profile</title>
    <script>

    </script>
<body>
<div style="float:right">
    <a href="search.jsp">back to search</a>
</div>
<h1>Profile</h1>

<table class="orcid-table">
    <tr>
        <td class="field-name">orcid ID</td>
        <td id="orcid-id"></td>
    </tr>
    <tr>
        <td class="field-name">family name</td>
        <td id="family-name"></td>
    </tr>
    <tr>
        <td class="field-name">given names</td>
        <td id="given-names"></td>
    </tr>
    <tr>
        <td class="field-name">affiliations</td>
        <td>
            <ul id="affiliations"></ul>
        </td>
    </tr>
    <tr>
        <td class="field-name">works</td>
        <td>
            <ul id="works"></ul>
        </td>
    </tr>
</table>

<h3>Profile Json <span class="response-toggle">show/hide</span></h3>
<div id="response-json" style="display:none"></div>

</body>

<script>


</script>


</html>