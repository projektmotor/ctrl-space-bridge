var cs = cs || {};
cs.templating = cs.templating || {};

/**
 * code taken from http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line
 * compiled the given template and replaces all tpl tags eith given json object params
 
 author: <%author%>
 <%if(this.showSkills) {%>
 <%for(var index in this.skills) {%> 
 <a href="#"><%this.skills[index]%></a>
 <%}%>+
 <%} else {%> +
 <p>none</p> +
 <%}%>
 
 call with:
 
 console.log(TemplateEngine(template, {
 author: "krasimir"
 skills: ["js", "html", "css"],
 showSkills: true
 }));
 
 * @param {string} template template code
 * @param {json} data json object containing all the data you want to replace or even arrays of data
 * @returns {string} replaced template code
 */
cs.templating.compile = function (template, data) {
    for (var prop in data)
        template = String(template).replace(new RegExp('{' + prop + '}', 'g'), data[prop]);
    return template;
}
