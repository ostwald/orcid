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

    <script src="profile-model.js"></script>
    <script src="config.js"></script>
    <script src="search-script.js"></script>



    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" href="styles.css">
    <meta charset=utf-8 />
    <!--<link rel='shortcut icon' href='https://www.dropbox.com/s/80dvo44nfw1a8yo/favicon.ico?dl=0' type='image/x-icon'/ >-->

    <title>ORCID Search</title>
    <script>

    </script>
<body>

<h1>Search</h1>

<form id="search-form">
<input type="text" id="query" size="50"><button type="submit" id="search-button">Search</button>
    <div id="fields-widget"></div>
</form>

<h2 id="results-header">Results</h2>


<table id="results-table" class="orcid-table">
    <thead>
        <tr class="header">
            <th>family name</th>
            <th>given name(s)</th>
            <th>orcid ID</th>
        </tr>
    </thead>
    <tbody id="results-body"></tbody>
</table>

<div id="response-json"></div>

</body>

<script>


</script>


</html>