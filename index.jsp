<%@ include file="/TagLibIncludes.jsp" %>
<%@ taglib prefix="html" uri="/WEB-INF/tlds/struts-html.tld" %>
<%@ taglib prefix="logic" uri="/WEB-INF/tlds/struts-logic.tld" %>
<%@ taglib prefix="bean-el" uri="/WEB-INF/tlds/struts-bean-el.tld"%>
<%@ taglib prefix="html-el" uri="/WEB-INF/tlds/struts-html-el.tld" %>
<%@ taglib prefix="logic-el" uri="/WEB-INF/tlds/struts-logic-el.tld" %>
<c:set var="contextUrl"><%@ include file="/ContextUrl.jsp" %></c:set>

<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Demo ORCID JSP Client</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></script>
    <script src="${contextUrl}/javascript/utils.js"></script>
    <script src="config.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" href="styles.css">
    <meta charset=utf-8 />
</head>
<body>
<h1>Demo ORCID Client</h1>
<ul>
    <li>
        <a href="search.jsp">Search</a>
    </li>
    <li>
        <a href="profile.jsp">Profile</a>
    </li>
    <li style="display:none">
        <a href="handshake.html">Handshake</a>
    </li>
</ul>

<h3>Default Config</h3>
    <div>Client: <span id="client" class="config-prop"></span></div>
    <div>Service: <span id="service" class="config-prop"></span></div>
</body>
<script>
 $(function () {
    $('#client').html(DEFAULT_CLIENT.name);
    $('#service').html(DEFAULT_SERVICE.name);
 });

</script>
</html>