<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:msxsl="urn:schemas-microsoft-com:xslt"
  exclude-result-prefixes="msxsl">

	<xsl:output method="xml" indent="no" omit-xml-declaration="yes"/>

	<xsl:param name="ViewMode" select="Full" />

	<xsl:param name="ThisPageUrl" select="''" />

	<xsl:param name="RootMapPageId" select="''"/>

	<xsl:param name="DisplayDraftComments" select="false"/>

	<xsl:variable name="vLower" select=
 "'abcdefghijklmnopqrstuvwxyz'"/>

	<xsl:variable name="vUpper" select=
 "'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>

	<xsl:key name="rellinks" match="//link[@role='friend'][@scope='local']" use="." />
	<xsl:variable name="allFootnotes" select="//fn"/>
	<xsl:variable name="allTables" select="//table/title[1]"/>
	<xsl:variable name="allFigures" select="//fig"/>

	<xsl:variable name="rootNodeName">
		<xsl:value-of select = "name(/*)"/>
	</xsl:variable>

	<xsl:template match="/">
		<xsl:choose>
			<xsl:when test="$ViewMode = 'TitleOnly'">
				<xsl:apply-templates select="/*/title">
					<xsl:with-param name="outputclass" select="'h1'"/>
				</xsl:apply-templates>
			</xsl:when>
			<xsl:when test="$ViewMode = 'Partial'">
				<xsl:apply-templates select="/*/title">
					<xsl:with-param name="outputclass" select="'h1'"/>
				</xsl:apply-templates>
				<xsl:apply-templates select="/*/shortdesc"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:apply-templates select="dita"/>
				<!-- Addt Templates -->
				<xsl:apply-templates select="concept"/>
				<xsl:apply-templates select="reference"/>
				<xsl:apply-templates select="task"/>
				<xsl:apply-templates select="topic"/>

				<xsl:apply-templates select="map"/>
				<xsl:apply-templates select="glossentry"/>
				<xsl:apply-templates select="troubleshooting"/>
				<!-- Other Potential Types -->
				<xsl:apply-templates select="learningOverview" />
				<xsl:apply-templates select="learningAssessment"/>
				<xsl:apply-templates select="learningSummary"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<!-- Composite DITA File from chunk=to-content -->
	<xsl:template match="dita">
		<xsl:apply-templates/>
	</xsl:template>



	<xsl:template match="dita/concept">
		<xsl:apply-templates select="./title">
			<xsl:with-param name="outputclass" select="'h1'"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="./shortdesc"/>
		<xsl:element name="hr"></xsl:element>
		<xsl:call-template name="prerequisites"/>
		<xsl:apply-templates select="./conbody"/>
		<xsl:apply-templates select="./glossentry"/>
		<xsl:apply-templates select="./related-links" />
		<xsl:variable name="allSectionNodes" select=".//concept | .//reference | .//task | .//topic"/>
		<xsl:for-each select="$allSectionNodes">
			<xsl:apply-templates select="." mode="isComposite">
				<xsl:with-param name="sectionNumber" select="position()"/>
			</xsl:apply-templates>
		</xsl:for-each>
		<xsl:call-template name="footnotes"/>
	</xsl:template>

	<xsl:template match="dita/reference">
		<xsl:apply-templates select="./title">
			<xsl:with-param name="outputclass" select="'h1'"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="./shortdesc"/>
		<xsl:element name="hr"></xsl:element>
		<xsl:call-template name="prerequisites"/>
		<xsl:apply-templates select="./refbody"/>
		<xsl:apply-templates select="./related-links" />
		<xsl:variable name="allSectionNodes" select=".//concept | .//reference | .//task | .//topic"/>
		<xsl:for-each select="$allSectionNodes">
			<xsl:apply-templates select="." mode="isComposite"/>
		</xsl:for-each>
		<xsl:call-template name="footnotes"/>
	</xsl:template>

	<xsl:template match="dita/task">
		<xsl:apply-templates select="./title">
			<xsl:with-param name="outputclass" select="'h1'"/>
			<xsl:with-param name="id" select="@id"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="./shortdesc"/>
		<xsl:call-template name="prerequisites"/>
		<xsl:apply-templates select="./taskbody"/>
		<xsl:apply-templates select="./related-links" />
		<xsl:variable name="allSectionNodes" select=".//concept | .//reference | .//task | .//topic"/>
		<xsl:for-each select="$allSectionNodes">
			<xsl:apply-templates select="." mode="isComposite"/>
		</xsl:for-each>
		<xsl:call-template name="footnotes"/>
	</xsl:template>

	<xsl:template match="dita/topic">
		<xsl:apply-templates select="./title">
			<xsl:with-param name="outputclass" select="'h1'"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="./shortdesc"/>
		<xsl:call-template name="prerequisites"/>
		<xsl:apply-templates select="./body"/>
		<xsl:apply-templates select="./related-links" />
		<xsl:variable name="allSectionNodes" select=".//concept | .//reference | .//task | .//topic"/>
		<xsl:for-each select="$allSectionNodes">
			<xsl:apply-templates select="." mode="isComposite"/>
		</xsl:for-each>
		<xsl:call-template name="footnotes"/>
	</xsl:template>

	<!-- DITA Glossentry Template -->
	<xsl:template match="glossentry">
		<xsl:apply-templates select="/*/title">
			<xsl:with-param name="outputclass" select="'h1'"/>
		</xsl:apply-templates>
		<!--<xsl:apply-templates select="shortdesc" />-->
		<xsl:choose>
			<xsl:when test="./glossBody">
				<xsl:apply-templates select="./glossBody">
					<xsl:with-param name="glossterm" select="glossterm"/>
					<xsl:with-param name="glossdef" select="glossdef"/>
				</xsl:apply-templates>
			</xsl:when>
			<xsl:otherwise>
				<div class="body glossBody">
					<xsl:apply-templates select="glossterm"/>
					<div class="glossdef">
						<xsl:apply-templates select="glossdef"/>
					</div>
				</div>
			</xsl:otherwise>
		</xsl:choose>

		<!--<xsl:apply-templates select="./related-links" />-->
	</xsl:template>

	<!-- glossBody Body Template -->
	<xsl:template match="glossBody">
		<xsl:param name="glossterm" />
		<xsl:param name="glossdef" />
		<div class="body glossBody">
			<xsl:apply-templates select="$glossterm"/>
			<div class="glossdef">
				<xsl:apply-templates select="$glossdef"/>
			</div>
			<div class="glossAcronym">
				<xsl:apply-templates select="glossAlt/glossAcronym"/>
			</div>
		</div>
	</xsl:template>
	<xsl:template match="glossAlt/glossAcronym">
		<strong>
			<xsl:text>Abbreviation: </xsl:text>
		</strong>
		<xsl:value-of select="."/>
	</xsl:template>

	<xsl:template match="glossterm">
		<h3 class="glossterm">
			<xsl:value-of select=
  "concat(translate(substring(.,1,1), $vLower, $vUpper),
          substring(., 2),
          substring(' ', 1 div not(position()=last()))
         )
  "/>
		</h3>
	</xsl:template>
	<xsl:template match="glossdef">
		<xsl:apply-templates/>
	</xsl:template>

	<xsl:template match="msgblock">
		<pre class="pre msgblock">
			<xsl:apply-templates />
		</pre>
	</xsl:template>

	<xsl:template match="msgph">
		<samp class="ph msgph">
			<xsl:apply-templates />
		</samp>
	</xsl:template>

	<xsl:template match="topicref" mode="tocwithdesc">
		<xsl:element name="li">
			<xsl:attribute name="class">
				<xsl:value-of select="'link ulchildlink'"/>
			</xsl:attribute>
			<xsl:choose>
				<xsl:when test="@navtitle='Notices'">
					<xsl:text>Notices</xsl:text>
				</xsl:when>
				<xsl:otherwise>
					<xsl:element name="strong">
						<xsl:call-template name="link_rendering">
							<xsl:with-param name="linkText">
								<xsl:choose>
									<xsl:when test="./topicmeta/navtitle != ''">
										<xsl:value-of select="normalize-space(./topicmeta/navtitle)"/>
									</xsl:when>
									<xsl:when test="./topicmeta/linktext != ''">
										<xsl:value-of select="normalize-space(./topicmeta/linktext)"/>
									</xsl:when>
								</xsl:choose>
							</xsl:with-param>
						</xsl:call-template>
					</xsl:element>
					<xsl:element name="br"></xsl:element>
					<xsl:value-of select="normalize-space(./topicmeta/shortdesc)"/>
				</xsl:otherwise>
			</xsl:choose>
			<!--<xsl:if test="topicref[not(@toc = 'no') and not(@processing-role= 'resource-only') and not(@type='glossentry') and not(@outputclass='frontmatter') and not(@outputclass= 'backmatter')]">
        <xsl:element name="ol">
          <xsl:attribute name="class">
            <xsl:value-of select="''"/>
          </xsl:attribute>
          <xsl:apply-templates select="topicref[not(@toc = 'no') and not(@processing-role= 'resource-only') and not(@type='glossentry') and not(@outputclass='frontmatter') and not(@outputclass= 'backmatter')]"/>
        </xsl:element>
      </xsl:if>-->
		</xsl:element>
	</xsl:template>

	<xsl:template match="topicref">
		<xsl:element name="li">
			<xsl:attribute name="class">
				<xsl:value-of select="'topicref'"/>
			</xsl:attribute>
			<xsl:choose>
				<xsl:when test="@navtitle='Notices'">
					<xsl:text>Notices</xsl:text>
				</xsl:when>
				<xsl:otherwise>
						<xsl:call-template name="link_rendering">
							<xsl:with-param name="linkText">
								<xsl:value-of select="normalize-space(./topicmeta/navtitle)"/>
							</xsl:with-param>
						</xsl:call-template>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:if test="topicref[not(@toc = 'no') and not(@processing-role= 'resource-only') and not(@type='glossentry') and not(@outputclass='frontmatter') and not(@outputclass= 'backmatter')]">
				<xsl:element name="ol">
					<xsl:apply-templates select="topicref[not(@toc = 'no') and not(@processing-role= 'resource-only') and not(@type='glossentry') and not(@outputclass='frontmatter') and not(@outputclass= 'backmatter')]"/>
				</xsl:element>
			</xsl:if>
		</xsl:element>
	</xsl:template>

	<!-- DITA Concept Template -->
	<xsl:template match="concept">
		<xsl:apply-templates select="/*/title">
			<xsl:with-param name="outputclass" select="'h1'"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="./shortdesc"/>
		<xsl:element name="hr">
			<xsl:attribute name="class">hr-md primary-l1</xsl:attribute>
		</xsl:element>
		<xsl:call-template name="prerequisites"/>
		<xsl:apply-templates select="./conbody"/>
		<xsl:apply-templates select="./glossentry"/>
		<xsl:call-template name="footnotes"/>
		<xsl:apply-templates select="./related-links" />
	</xsl:template>

	<!-- DITA Concept Composite Template -->
	<xsl:template match="concept" mode="isComposite">
		<xsl:param name="sectionNumber" />
		<xsl:variable name="localFootnotes" select=".//fn"/>
		<xsl:apply-templates select="./title" mode="sectionTitle">
			<xsl:with-param name="sectionNumber" select="$sectionNumber" />
		</xsl:apply-templates>
		<xsl:apply-templates select="./shortdesc"/>
		<xsl:element name="hr">
			<xsl:attribute name="class">hr-md primary-l1</xsl:attribute>
		</xsl:element>
		<xsl:call-template name="prerequisites"/>
		<xsl:apply-templates select="./conbody"/>
		<xsl:apply-templates select="./glossentry"/>
		<!--<xsl:call-template name="localFootnotes">
      <xsl:with-param name="localFootnotes" select="$localFootnotes"/>
    </xsl:call-template>-->
		<!--<div class="spacer">
      <xsl:text> </xsl:text>
    </div>-->
		<xsl:apply-templates select="./related-links" />
	</xsl:template>


	<!-- Concept Body Template -->
	<xsl:template match="conbody">
		<xsl:element name="div">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'body conbody'"/>
			</xsl:call-template>
			<xsl:apply-templates />
		</xsl:element>
	</xsl:template>

	<!-- DITA Reference Template -->
	<xsl:template match="reference">
		<xsl:apply-templates select="/*/title">
			<xsl:with-param name="outputclass" select="'h1'"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="./shortdesc"/>
		<xsl:element name="hr">
			<xsl:attribute name="class">hr-md primary-l1</xsl:attribute>
		</xsl:element>
		<xsl:call-template name="prerequisites"/>
		<xsl:apply-templates select="./refbody"/>
		<xsl:call-template name="footnotes"/>
		<xsl:apply-templates select="./related-links" />
	</xsl:template>

	<!-- DITA Reference Composite Template -->
	<xsl:template match="reference" mode="isComposite">
		<xsl:param name="sectionNumber" />
		<xsl:variable name="localFootnotes" select=".//fn"/>
		<xsl:apply-templates select="./title" mode="sectionTitle">
			<xsl:with-param name="sectionNumber" select="$sectionNumber" />
		</xsl:apply-templates>
		<xsl:apply-templates select="./shortdesc"/>
		<xsl:element name="hr">
			<xsl:attribute name="class">hr-md primary-l1</xsl:attribute>
		</xsl:element>
		<xsl:call-template name="prerequisites"/>
		<xsl:apply-templates select="./refbody"/>
		<!--<xsl:call-template name="localFootnotes">
      <xsl:with-param name="localFootnotes" select="$localFootnotes"/>
    </xsl:call-template>-->
		<!--<div class="spacer">
      <xsl:text> </xsl:text>
    </div>-->
		<xsl:apply-templates select="./related-links" />
	</xsl:template>

	<!-- Reference Body Template -->
	<xsl:template match="refbody">
		<xsl:element name="div">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'body refbody'"/>
			</xsl:call-template>
			<xsl:apply-templates />
		</xsl:element>
	</xsl:template>

	<!-- DITA Task Template -->
	<xsl:template match="task">
		<xsl:apply-templates select="./title">
			<xsl:with-param name="outputclass" select="'h1'"/>
			<xsl:with-param name="id" select="@id"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="./shortdesc"/>
		<xsl:element name="hr">
			<xsl:attribute name="class">hr-md primary-l1</xsl:attribute>
		</xsl:element>
		<xsl:call-template name="prerequisites"/>
		<xsl:apply-templates select="./taskbody"/>
		<xsl:variable name="allSectionNodes" select=".//concept | .//reference | .//task | .//topic"/>
		<xsl:for-each select="$allSectionNodes">
			<xsl:apply-templates select="." mode="isComposite"/>
		</xsl:for-each>
		<xsl:call-template name="footnotes"/>
		<xsl:apply-templates select="./related-links" />
	</xsl:template>

	<!-- DITA Task Composite Template -->
	<xsl:template match="task" mode="isComposite">
		<xsl:param name="sectionNumber" />
		<xsl:variable name="localFootnotes" select=".//fn"/>
		<xsl:apply-templates select="./title">
			<xsl:with-param name="id" select="@id"/>
		</xsl:apply-templates>
		<!--<xsl:apply-templates select="./title" mode="sectionTitle">
      <xsl:with-param name="sectionNumber" select="$sectionNumber" />
    </xsl:apply-templates>-->
		<xsl:apply-templates select="./shortdesc"/>
		<xsl:call-template name="prerequisites"/>
		<xsl:apply-templates select="./taskbody"/>
		<!--<xsl:call-template name="localFootnotes">
      <xsl:with-param name="localFootnotes" select="$localFootnotes"/>
    </xsl:call-template>-->
		<!--<div class="spacer">
      <xsl:text> </xsl:text>
    </div>-->
		<xsl:apply-templates select="./related-links" />
	</xsl:template>

	<!-- DITA Topic Template -->
	<xsl:template match="topic">
		<xsl:apply-templates select="/*/title">
			<xsl:with-param name="outputclass" select="'h1'"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="./shortdesc"/>
		<xsl:element name="hr">
			<xsl:attribute name="class">hr-md primary-l1</xsl:attribute>
		</xsl:element>
		<xsl:call-template name="prerequisites"/>
		<xsl:apply-templates select="./body"/>
		<xsl:call-template name="footnotes"/>
		<xsl:apply-templates select="./related-links" />
	</xsl:template>
	
	<!-- DITA Chunked Glossary Template -->
	<xsl:template match="topic[@outputclass='chunked-glossary']">
		<!-- Apply the standard title processing -->
		<xsl:apply-templates select="./title">
			<xsl:with-param name="outputclass" select="'h1'"/>
		</xsl:apply-templates>
		
		<!-- Apply the shortdesc -->
		<xsl:apply-templates select="./shortdesc"/>
		
		<!-- Apply the body content -->
		<xsl:apply-templates select="./body"/>
		
		<!-- Create a variable containing all glossentry elements -->
		<xsl:variable name="all-entries" select=".//glossentry"/>
		
		<!-- Define alphabet and numbers as a string for standard XSLT 1.0 compatibility -->
		<xsl:variable name="alphabet-and-numbers-string" select="'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
		
		<!-- Create the A-Z navigation bar -->
		<div class="glossary-nav">
			<xsl:call-template name="process-alphabet-nav">
				<xsl:with-param name="alphabet" select="$alphabet-and-numbers-string"/>
				<xsl:with-param name="all-entries" select="$all-entries"/>
				<xsl:with-param name="position" select="1"/>
			</xsl:call-template>
		</div>
		
		<!-- Process entries grouped by first letter -->
		<div class="glossary-entries">
			<xsl:call-template name="process-alphabet-entries">
				<xsl:with-param name="alphabet" select="$alphabet-and-numbers-string"/>
				<xsl:with-param name="all-entries" select="$all-entries"/>
				<xsl:with-param name="position" select="1"/>
			</xsl:call-template>
		</div>
		
		<!-- Apply any footnotes and related links -->
		<xsl:call-template name="footnotes"/>
		<xsl:apply-templates select="./related-links" />
	</xsl:template>
	
	<!-- Template to process alphabet navigation recursively -->
	<xsl:template name="process-alphabet-nav">
		<xsl:param name="alphabet"/>
		<xsl:param name="all-entries"/>
		<xsl:param name="position"/>
		
		<xsl:if test="$position &lt;= string-length($alphabet)">
			<xsl:variable name="current-letter" select="substring($alphabet, $position, 1)"/>
			<xsl:variable name="entries-with-letter" select="$all-entries[starts-with(translate(normalize-space(glossterm), $vLower, $vUpper), $current-letter)]"/>
			
			<xsl:choose>
				<xsl:when test="count($entries-with-letter) > 0">
					<a href="#{$current-letter}" class="glossary-nav-link">
						<xsl:value-of select="$current-letter"/>
					</a>
				</xsl:when>
				<xsl:otherwise>
					<span class="glossary-nav-disabled">
						<xsl:value-of select="$current-letter"/>
					</span>
				</xsl:otherwise>
			</xsl:choose>
			
			<xsl:if test="$position != string-length($alphabet)">
				<span class="glossary-nav-separator">|</span>
			</xsl:if>
			
			<!-- Recursive call for next letter -->
			<xsl:call-template name="process-alphabet-nav">
				<xsl:with-param name="alphabet" select="$alphabet"/>
				<xsl:with-param name="all-entries" select="$all-entries"/>
				<xsl:with-param name="position" select="$position + 1"/>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>
	
	<!-- Template to process alphabet entries recursively -->
	<xsl:template name="process-alphabet-entries">
		<xsl:param name="alphabet"/>
		<xsl:param name="all-entries"/>
		<xsl:param name="position"/>
		
		<xsl:if test="$position &lt;= string-length($alphabet)">
			<xsl:variable name="current-letter" select="substring($alphabet, $position, 1)"/>
			<xsl:variable name="entries-with-letter" select="$all-entries[starts-with(translate(normalize-space(glossterm), $vLower, $vUpper), $current-letter)]"/>
			
			<xsl:if test="count($entries-with-letter) > 0">
				<!-- Create letter heading with anchor -->
				<h2 id="{$current-letter}" class="glossary-letter-heading">
					<xsl:value-of select="$current-letter"/>
				</h2>
				
				<!-- Process all entries for this letter -->
				<dl class="glossary-letter-entries">
					<xsl:for-each select="$entries-with-letter">
						<xsl:sort select="translate(normalize-space(glossterm), $vUpper, $vLower)" data-type="text" order="ascending"/>
						
						<dt class="glossterm" id="{@id}">
							<xsl:value-of select="glossterm"/>
						</dt>
						<dd class="glossdef">
							<xsl:apply-templates select="glossdef"/>
						</dd>
					</xsl:for-each>
				</dl>
			</xsl:if>
			
			<!-- Recursive call for next letter -->
			<xsl:call-template name="process-alphabet-entries">
				<xsl:with-param name="alphabet" select="$alphabet"/>
				<xsl:with-param name="all-entries" select="$all-entries"/>
				<xsl:with-param name="position" select="$position + 1"/>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>

	<!-- DITA Topic Composite Template -->
	<xsl:template match="topic" mode="isComposite">
		<xsl:param name="sectionNumber" />
		<xsl:variable name="localFootnotes" select=".//fn"/>
		<xsl:apply-templates select="./title" mode="sectionTitle">
			<xsl:with-param name="sectionNumber" select="$sectionNumber" />
		</xsl:apply-templates>
		<xsl:apply-templates select="./shortdesc"/>
		<xsl:element name="hr">
			<xsl:attribute name="class">hr-md primary-l1</xsl:attribute>
		</xsl:element>
		<xsl:call-template name="prerequisites"/>
		<xsl:apply-templates select="./body"/>
		<!--<xsl:call-template name="localFootnotes">
      <xsl:with-param name="localFootnotes" select="$localFootnotes"/>
    </xsl:call-template>-->
		<!--<div class="spacer">
      <xsl:text> </xsl:text>
    </div>-->
		<xsl:apply-templates select="./related-links" />
	</xsl:template>

	<!-- DITA Topic Template -->
	<xsl:template match="troubleshooting">
		<xsl:apply-templates select="/*/title">
			<xsl:with-param name="outputclass" select="'h1'"/>
		</xsl:apply-templates>
		<xsl:apply-templates select="./shortdesc"/>
		<xsl:element name="hr">
			<xsl:attribute name="class">hr-md primary-l1</xsl:attribute>
		</xsl:element>
		<xsl:call-template name="prerequisites"/>
		<xsl:apply-templates select="./troublebody"/>
		<xsl:call-template name="footnotes"/>
		<xsl:apply-templates select="./related-links" />
	</xsl:template>

	<!-- DITA Topic Composite Template -->
	<xsl:template match="troubleshooting" mode="isComposite">
		<xsl:param name="sectionNumber" />
		<xsl:variable name="localFootnotes" select=".//fn"/>
		<xsl:apply-templates select="./title" mode="sectionTitle">
			<xsl:with-param name="sectionNumber" select="$sectionNumber" />
		</xsl:apply-templates>
		<xsl:apply-templates select="./shortdesc"/>
		<xsl:element name="hr">
			<xsl:attribute name="class">hr-md primary-l1</xsl:attribute>
		</xsl:element>
		<xsl:call-template name="prerequisites"/>
		<xsl:apply-templates select="./body"/>
		<!--<xsl:call-template name="localFootnotes">
      <xsl:with-param name="localFootnotes" select="$localFootnotes"/>
    </xsl:call-template>-->
		<!--<div class="spacer">
      <xsl:text> </xsl:text>
    </div>-->
		<xsl:apply-templates select="./related-links" />
	</xsl:template>

	<xsl:template match="tasktroubleshooting">
		<div class="troubleshooting">
			<p>
				<strong>Task Troubleshooting: </strong>
				<xsl:apply-templates select="node()" />
			</p>
		</div>
	</xsl:template>
	
	<xsl:template match="tasktroubleshooting/p">
		<xsl:apply-templates select="node()" /> <br/>
	</xsl:template>

	<xsl:template name="prerequisites">
		<xsl:if test=".//link[@importance='required'] and not(.//prereq)">
			<ul style="list-style-type:none;">
				<!--<xsl:apply-templates select=".//link[@importance='required']" />-->
				<xsl:for-each select=".//link[@importance='required']">
					<li class="related-link">
						<xsl:call-template name="link_rendering"/>
					</li>
				</xsl:for-each>
			</ul>
		</xsl:if>
	</xsl:template>

	<xsl:template name="footnotes">
		<xsl:if test="$allFootnotes">
			<xsl:for-each select="$allFootnotes">
				<xsl:variable name="id" select="@id"/>
				<xsl:variable name="callout">
					<xsl:apply-templates select="." mode="callout"/>
				</xsl:variable>
				<xsl:choose>
					<xsl:when test="not(@id)">
						<div class="footnote" id="footnotes/{$callout}">
							<sup>
								<xsl:element name="a">
									<xsl:copy-of select="$callout"/>
								</xsl:element>
							</sup>
							<xsl:text> </xsl:text>
							<xsl:apply-templates/>
						</div>
					</xsl:when>
					<xsl:otherwise>
						<!-- Footnote with id does not generate its own callout. -->
						<div class="footnote" name="footnotes/{@id}" id="footnotes/{@id}">
							<sup>
								<xsl:element name="a">
									<xsl:copy-of select="$callout"/>
								</xsl:element>
							</sup>
							<xsl:text> </xsl:text>
							<xsl:apply-templates/>
						</div>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:for-each>
		</xsl:if>
	</xsl:template>

	<xsl:template name="localFootnotes">
		<xsl:param name="localFootnotes" />
		<xsl:if test="$localFootnotes">
			<xsl:for-each select="$localFootnotes">
				<xsl:variable name="id" select="@id"/>
				<xsl:variable name="callout">
					<xsl:apply-templates select="." mode="callout"/>
				</xsl:variable>
				<xsl:choose>
					<xsl:when test="not(@id)">
						<div class="footnote" id="footnotes/{$callout}">
							<sup>
								<xsl:element name="a">
									<xsl:copy-of select="$callout"/>
								</xsl:element>
							</sup>
							<xsl:text> </xsl:text>
							<xsl:apply-templates/>
						</div>
					</xsl:when>
					<xsl:otherwise>
						<!-- Footnote with id does not generate its own callout. -->
						<div class="footnote" name="footnotes/{@id}" id="footnotes/{@id}">
							<sup>
								<xsl:element name="a">
									<xsl:copy-of select="$callout"/>
								</xsl:element>
							</sup>
							<xsl:text> </xsl:text>
							<xsl:apply-templates/>
						</div>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:for-each>
		</xsl:if>
	</xsl:template>


	<!-- bug in import that sets #anchor links to include the root map xID so #anchor becomes xRootId#anchor -->
	<xsl:template match="imagemap">
		<xsl:element name="div">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'fig imagemap map'"/>
			</xsl:call-template>
			<xsl:call-template name="commonattributes"/>
			<xsl:variable name="altText" select="./image/alt/text()[1]"></xsl:variable>
			<xsl:apply-templates select="./image"/>
			<map name="map_{./image/@id}" id="map_{./image/@id}">
				<xsl:for-each select=".//area">
					<xsl:variable name="path">
						<xsl:choose>
							<xsl:when test="contains(./xref/@href, '#')">
								<xsl:value-of select="substring-before(./xref/@href, '#')"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="./xref/@href"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:variable>
					<xsl:variable name="pageUrl">
						<xsl:choose>
							<xsl:when test="normalize-space($path) != ''">
								<xsl:choose>
									<xsl:when test="starts-with($path, 'x') and string(number(substring-after($path, 'x'))) != 'NaN'">
										<xsl:value-of select="concat($path, '.xml')"/>
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="$path"/>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="$ThisPageUrl"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:variable>
					<xsl:variable name="bookmark" select="substring-after(./xref/@href, '#')"/>
					<xsl:variable name="masterBookmark">
						<xsl:choose>
							<xsl:when test="contains($bookmark, '/')">
								<xsl:value-of select="substring-after($bookmark, '/')"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="$bookmark"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:variable>
					<!--<xsl:variable name="pageLink"><xsl:choose><xsl:when test="$bookmark != ''"><xsl:value-of select="concat(substring-before($path, '#'), '.xml')"/></xsl:when><xsl:otherwise><xsl:value-of select="concat($path, '.xml')"/></xsl:otherwise></xsl:choose></xsl:variable>-->
					<xsl:element name="area">
						<xsl:attribute name="href">
							<xsl:choose>
								<xsl:when test="$bookmark = ''">
									<xsl:value-of select="$pageUrl"/>
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="concat($pageUrl, concat('#', $masterBookmark))"/>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:attribute>
						<xsl:attribute name="alt">
							<xsl:value-of select="$altText"/>
						</xsl:attribute>
						<xsl:attribute name="title">
							<xsl:value-of select="$altText"/>
						</xsl:attribute>
						<xsl:attribute name="shape">
							<xsl:value-of select="./shape"/>
						</xsl:attribute>
						<xsl:attribute name="coords">
							<xsl:value-of select="./coords"/>
						</xsl:attribute>
					</xsl:element>
				</xsl:for-each>
			</map>
		</xsl:element>
	</xsl:template>


	<!-- Task Body Template -->
	<xsl:template match="taskbody">
		<xsl:element name="div">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'body taskbody'"/>
			</xsl:call-template>
			<xsl:apply-templates />
		</xsl:element>
	</xsl:template>

	<!-- Task Body Template -->
	<xsl:template match="body">
		<xsl:element name="div">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'body taskbody'"/>
			</xsl:call-template>
			<xsl:apply-templates />
		</xsl:element>
	</xsl:template>

	<!-- Trouble Body Template -->
	<xsl:template match="troublebody">
		<xsl:element name="div">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'body troublebody'"/>
			</xsl:call-template>
			<xsl:apply-templates />
		</xsl:element>
	</xsl:template>

	<xsl:template match="condition">
		<div class="section condition" id="{@id}">
			<xsl:apply-templates />
		</div>
	</xsl:template>

	<xsl:template match="sectiondiv">
		<!--<dl class="dl" id="{@id}">
      <dt class="dt dlterm">
        <xsl:value-of select="./div/b"/>
      </dt>
      <dd class="dd">
        <xsl:value-of select="./p"/>
      </dd>
    </dl>-->
		<div class="sectiondiv">
			<xsl:apply-templates />
		</div>
	</xsl:template>

	<xsl:template match="troubleSolution">
		<div class="bodydiv troubleSolution" id="{@id}">
			<xsl:apply-templates />
		</div>
	</xsl:template>

	<xsl:template match="cause">
		<div class="section cause" id="{@id}">
			<xsl:apply-templates />
		</div>
	</xsl:template>

	<xsl:template match="remedy">
		<div class="section remedy" id="{@id}">
			<xsl:apply-templates />
		</div>
	</xsl:template>

	<xsl:template match="context">
		<div class="section context" id="{@id}">
			<xsl:apply-templates />
		</div>
	</xsl:template>

	<xsl:template match="prereq">
		<div class="prereq margin-full" id="{@id}">
			<strong>Prerequisites: </strong>
			<xsl:if test="//link[@importance='required']">
				<ul style="list-style-type:none;">
					<xsl:for-each select="//link[@importance='required']">
						<li class="related-link">
							<xsl:call-template name="link_rendering"/>
						</li>
					</xsl:for-each>
				</ul>
			</xsl:if>
			<xsl:apply-templates />
		</div>
		<hr class="hr-md primary-l1 gray-9"/>
	</xsl:template>

	<xsl:template match="postreq">
		<xsl:choose>
			<xsl:when test="@importance = 'optional'">
				<p class="postreq">
					<strong>Next Steps (optional): </strong>
					<xsl:apply-templates/>
				</p>
			</xsl:when>
			<xsl:otherwise>
				<p class="postreq">
					<strong>Next Steps: </strong>
					<xsl:apply-templates/>
				</p>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="text()[normalize-space()][1]">
		<xsl:if test=". != ''">
			<xsl:value-of select="."/>
		</xsl:if>
	</xsl:template>


	<xsl:template match="xmlelement">
		<xsl:if test="node()[string-length() != 0]">
			<code class="keyword markupname xmlelement">
				<xsl:text>&lt;</xsl:text>
				<xsl:apply-templates select="node()" />
				<xsl:text>&gt;</xsl:text>
			</code>
		</xsl:if>
	</xsl:template>

	<xsl:template match="xmlatt">
		<xsl:if test="node()[string-length() != 0]">
			<code class="keyword xmlatt">
				<xsl:text>@</xsl:text>
				<xsl:apply-templates select="node()" />
			</code>
		</xsl:if>
	</xsl:template>

	<xsl:template match="xref[not(starts-with(@href, '#'))]">
		<xsl:text> </xsl:text>
		<xsl:element name="a">
			<xsl:variable name="path">
				<xsl:choose>
					<xsl:when test="contains(@href, '#')">
						<xsl:value-of select="substring-before(@href, '#')"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="@href"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>

			<xsl:variable name="pageUrl">
				<xsl:choose>
					<xsl:when test="normalize-space($path) != ''">
						<xsl:choose>
							<xsl:when test="starts-with($path, 'x') and string(number(substring-after($path, 'x'))) != 'NaN'">
								<xsl:value-of select="concat($path, '.xml')"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="$path"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$ThisPageUrl"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>

			<xsl:variable name="bookmark" select="substring-after(@href, '#')"></xsl:variable>

			<xsl:variable name="masterBookmark">
				<xsl:choose>
					<xsl:when test="contains($bookmark, '/')">
						<xsl:value-of select="substring-after($bookmark, '/')"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$bookmark"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>

			<xsl:attribute name="data-scope">
				<xsl:value-of select="@scope"/>
			</xsl:attribute>
			<xsl:attribute name="data-name">
				<xsl:value-of select="@data-name"/>
			</xsl:attribute>
			<xsl:attribute name="href">
				<xsl:choose>
					<xsl:when test="@format = 'email'">
						<xsl:text>mailto:</xsl:text>
						<xsl:value-of select="." />
					</xsl:when>
					<xsl:when test="@scope = 'external'">
						<xsl:choose>
							<xsl:when test="starts-with(./@href, 'mailto:')">
								<xsl:value-of select="./@href"/>
							</xsl:when>
							<xsl:when test="starts-with(./@href, 'http')">
								<xsl:value-of select="./@href"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="concat('https://', ./@href)"/>
							</xsl:otherwise>
						</xsl:choose>

					</xsl:when>
					<xsl:otherwise>
						<xsl:choose>
							<xsl:when test="$bookmark = ''">
								<xsl:value-of select="$pageUrl"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="concat($pageUrl, concat('#', $masterBookmark))"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:attribute name="target">
				<xsl:choose>
					<xsl:when test="@scope = 'external'">
						<xsl:value-of select="string('_blank')"/>
					</xsl:when>
					<xsl:otherwise>
						<!--otherwise leave empty-->
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>

			<xsl:attribute name="title">
				<xsl:value-of select="normalize-space(./desc)"/>
			</xsl:attribute>
			<xsl:if test="contains(@outputclass, 'download')">
				<xsl:attribute name="download"/>
			</xsl:if>
			<xsl:choose>
				<xsl:when test="normalize-space(.)">
					<xsl:apply-templates/>
				</xsl:when>
				<xsl:when test="normalize-space(@data-name)">
					<xsl:value-of select="@data-name"/>
				</xsl:when>
				<xsl:otherwise>
					&#160;
				</xsl:otherwise>
			</xsl:choose>
		</xsl:element>
	</xsl:template>

	<xsl:template match="xref[starts-with(@href, '#')]">
		<xsl:text> </xsl:text>
		<xsl:element name="a">
			<xsl:variable name="path">
				<xsl:choose>
					<xsl:when test="contains(@href, '#')">
						<xsl:value-of select="substring-before(@href, '#')"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="@href"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>

			<xsl:variable name="pageUrl">
				<xsl:choose>
					<xsl:when test="normalize-space($path) != ''">
						<xsl:choose>
							<xsl:when test="starts-with($path, 'x') and string(number(substring-after($path, 'x'))) != 'NaN'">
								<xsl:value-of select="concat($path, '.xml')"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="$path"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$ThisPageUrl"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>

			<xsl:variable name="bookmark" select="substring-after(@href, '#')"></xsl:variable>

			<xsl:variable name="masterBookmark">
				<xsl:choose>
					<xsl:when test="contains($bookmark, '/')">
						<xsl:value-of select="substring-after($bookmark, '/')"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$bookmark"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>

			<xsl:attribute name="data-scope">
				<xsl:value-of select="@scope"/>
			</xsl:attribute>

			<xsl:attribute name="target">
				<xsl:choose>
					<xsl:when test="@scope = 'external'">
						<xsl:value-of select="string('_blank')"/>
					</xsl:when>
					<xsl:otherwise>
						<!--otherwise leave empty-->
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>

			<xsl:attribute name="href">
				<xsl:choose>
					<xsl:when test="@format = 'email'">
						<xsl:text>mailto:</xsl:text>
						<xsl:value-of select="." />
					</xsl:when>
					<xsl:when test="@scope = 'external'">
						<xsl:choose>
							<xsl:when test="starts-with(./@href, 'mailto:')">
								<xsl:value-of select="./@href"/>
							</xsl:when>
							<xsl:when test="starts-with(./@href, 'http')">
								<xsl:value-of select="./@href"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="concat('https://', ./@href)"/>
							</xsl:otherwise>
						</xsl:choose>

					</xsl:when>
					<xsl:otherwise>
						<xsl:choose>
							<xsl:when test="$bookmark = ''">
								<xsl:value-of select="$pageUrl"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="concat('#', $masterBookmark)"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>

			<xsl:attribute name="title">
				<xsl:value-of select="normalize-space(./desc)"/>
			</xsl:attribute>
			<xsl:if test="contains(@outputclass, 'download')">
				<xsl:attribute name="download"/>
			</xsl:if>
			<xsl:apply-templates/>

		</xsl:element>
	</xsl:template>

	<xsl:template match="xref/desc">
		<!--do nothing-->
	</xsl:template>

	<xsl:template match="div[@outputclass='prereq margin-full']">
		<div class="prereq margin-full">
			<xsl:apply-templates/>
			<hr class="hr-md primary-l1 gray-9"/>
		</div>
	</xsl:template>

	<xsl:template match="div">
		<xsl:element name="div">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="@outputclass"/>
			</xsl:call-template>
			<xsl:apply-templates />
		</xsl:element>
	</xsl:template>

	<xsl:template match="xref[@type='fn']">
		<xsl:if test ="normalize-space(@href)">
			<sup>
				<xsl:text> </xsl:text>
				<xsl:element name="a">
					<xsl:attribute name="href">
						<xsl:choose>
							<xsl:when test="starts-with(@href, '#')">
								<xsl:choose>
									<xsl:when test="contains(@href, '/')">
										<xsl:value-of select="concat($ThisPageUrl, concat('#footnotes/', substring-after(@href, '/')))"/>
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="concat($ThisPageUrl, concat('#footnotes/', substring-after(@href, '#')))"/>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="@href"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>
					<xsl:apply-templates/>
				</xsl:element>
			</sup>
		</xsl:if>
	</xsl:template>

	<xsl:template match="stepsection">
		<div class="li stepsection margin-full" id="{@id}">
			<xsl:apply-templates />
		</div>
	</xsl:template>

	<xsl:template match="remedy/steps">
		<div>
			<xsl:apply-templates select="./stepsection"/>
			<ol class="ol steps">
				<xsl:for-each select="step">
					<li>
						<xsl:call-template name="commonattributes">
							<xsl:with-param name="default-output-class" select="'li step stepexpanded'"/>
						</xsl:call-template>
						<xsl:if test="@importance = 'optional'">
							<strong>Optional: </strong>
						</xsl:if>
						<xsl:if test="@importance = 'required'">
							<strong>Required: </strong>
						</xsl:if>
						<xsl:apply-templates select="node()"/>
					</li>
				</xsl:for-each>
			</ol>
		</div>
	</xsl:template>

	<xsl:template match="steps">
		<xsl:apply-templates select="./stepsection"/>
		<ol class="ol steps">
			<xsl:for-each select="step">
				<li>
					<xsl:call-template name="commonattributes">
						<xsl:with-param name="default-output-class" select="'li step stepexpanded'"/>
					</xsl:call-template>
					<xsl:if test="@importance = 'optional'">
						<strong>Optional: </strong>
					</xsl:if>
					<xsl:if test="@importance = 'required'">
						<strong>Required: </strong>
					</xsl:if>
					<xsl:apply-templates select="node()"/>
				</li>
			</xsl:for-each>
		</ol>
	</xsl:template>

	<xsl:template match="steps-unordered">
		<xsl:apply-templates select="./stepsection"/>
		<ul class="ul steps">
			<xsl:for-each select="step">
				<li>
					<xsl:call-template name="commonattributes">
						<xsl:with-param name="default-output-class" select="'li step stepexpanded'"/>
					</xsl:call-template>
					<xsl:if test="@importance = 'optional'">
						<strong>Optional: </strong>
					</xsl:if>
					<xsl:if test="@importance = 'required'">
						<strong>Required: </strong>
					</xsl:if>
					<xsl:apply-templates select="node()"/>
				</li>
			</xsl:for-each>
		</ul>
	</xsl:template>

	<xsl:template match="steps-informal">
		<xsl:apply-templates />
	</xsl:template>

	<xsl:template match="substeps">
		<ol class="ol substeps">
			<xsl:for-each select="substep">
				<li class="li">
					<xsl:apply-templates select="node()"/>
				</li>
			</xsl:for-each>
		</ol>
	</xsl:template>

	<xsl:template match="result">
		<xsl:if test="node()[string-length() != 0]">
			<p class="p result">
				<xsl:apply-templates select="node()[string-length() != 0]"/>
			</p>
		</xsl:if>
	</xsl:template>

	<xsl:template match="stepresult">
		<div class="itemgroup stepresult" id="{@id}">
			<xsl:apply-templates />
		</div>
	</xsl:template>

	<!--TODO: How should Keyword DITA element styling look? Do these need to Link? -->
	<xsl:template match="keyword">
		<xsl:element name="span">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'keyword'"/>
			</xsl:call-template>
			<xsl:apply-templates />
		</xsl:element>
	</xsl:template>

	<!-- CMD example ot passing node() set vs select -->
	<!--<xsl:template match="cmd">
    <xsl:apply-templates select="node()"/>
  </xsl:template>-->

	<!-- ui-domain.ent domain: uicontrol | wintitle | menucascade | shortcut -->

	<xsl:template match="menucascade">
		<span class="menucascade">
			<xsl:for-each select=".//uicontrol">
				<kbd><xsl:apply-templates/></kbd>
				<xsl:if test="position() != last()">
					<span class="separator"> &#x203A; </span>
				</xsl:if>
			</xsl:for-each>
		</span>
	</xsl:template>

	<xsl:template match="uicontrol">
		<kbd><xsl:apply-templates/></kbd>
	</xsl:template>
	<xsl:template match="wintitle">
		<xsl:element name="span">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'keyword wintitle'"/>
			</xsl:call-template>
			<xsl:apply-templates />
		</xsl:element>
	</xsl:template>
	<xsl:template match="shortcut">
		<xsl:element name="span">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'shortcut'"/>
			</xsl:call-template>
			<xsl:apply-templates />
		</xsl:element>
	</xsl:template>
	<xsl:template match="cmd">
		<xsl:element name="span">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'ph cmd'"/>
			</xsl:call-template>
			<xsl:apply-templates />
		</xsl:element>
	</xsl:template>

	<!-- programming-domain.ent domain: codeblock | codeph | var | kwd | synph | oper | delim | sep | repsep |
                                    option | parmname | apiname-->

	<xsl:template match="codeblock">
		<xsl:if test="node()[string-length() != 0]">
			<xsl:variable name="lang">
				<xsl:choose>
					<xsl:when test="@outputclass != ''"><xsl:value-of select="@outputclass"/></xsl:when>
					<xsl:otherwise>text</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>
			<div class="code-block">
				<div class="code-header">
					<span class="code-language"><xsl:value-of select="$lang"/></span>
					<button class="code-copy" data-copy="true">Copy</button>
				</div>
				<pre><code class="{$lang}"><xsl:apply-templates select="node()"/></code></pre>
			</div>
		</xsl:if>
	</xsl:template>

	<xsl:template match="codeph">
		<xsl:if test="node()[string-length() != 0]">
			<xsl:element name="code">
				<xsl:call-template name="commonattributes">
					<xsl:with-param name="default-output-class" select="'ph codeph'"/>
				</xsl:call-template>
				<xsl:apply-templates select="node()" />
			</xsl:element>
		</xsl:if>
	</xsl:template>

	<xsl:template match="kwd">
		<xsl:if test="node()[string-length() != 0]">
			<xsl:element name="span">
				<xsl:call-template name="commonattributes">
					<xsl:with-param name="default-output-class" select="'kwd'"/>
				</xsl:call-template>
				<xsl:apply-templates select="node()" />
			</xsl:element>
		</xsl:if>
	</xsl:template>
	<xsl:template match="var">
		<xsl:if test="node()[string-length() != 0]">
			<xsl:element name="span">
				<xsl:call-template name="commonattributes">
					<xsl:with-param name="default-output-class" select="'var'"/>
				</xsl:call-template>
				<xsl:apply-templates select="node()" />
			</xsl:element>
		</xsl:if>
	</xsl:template>
	<xsl:template match="synph">
		<xsl:if test="node()[string-length() != 0]">
			<xsl:element name="span">
				<xsl:call-template name="commonattributes">
					<xsl:with-param name="default-output-class" select="'synph'"/>
				</xsl:call-template>
				<xsl:apply-templates select="node()" />
			</xsl:element>
		</xsl:if>
	</xsl:template>
	<xsl:template match="oper">
		<xsl:if test="node()[string-length() != 0]">
			<xsl:element name="span">
				<xsl:call-template name="commonattributes">
					<xsl:with-param name="default-output-class" select="'oper'"/>
				</xsl:call-template>
				<xsl:apply-templates select="node()" />
			</xsl:element>
		</xsl:if>
	</xsl:template>
	<xsl:template match="delim">
		<xsl:if test="node()[string-length() != 0]">
			<xsl:element name="span">
				<xsl:call-template name="commonattributes">
					<xsl:with-param name="default-output-class" select="'delim'"/>
				</xsl:call-template>
				<xsl:apply-templates select="node()" />
			</xsl:element>
		</xsl:if>
	</xsl:template>
	<xsl:template match="sep">
		<xsl:if test="node()[string-length() != 0]">
			<xsl:element name="span">
				<xsl:call-template name="commonattributes">
					<xsl:with-param name="default-output-class" select="'sep'"/>
				</xsl:call-template>
				<xsl:apply-templates select="node()" />
			</xsl:element>
		</xsl:if>
	</xsl:template>
	<xsl:template match="repsep">
		<xsl:if test="node()[string-length() != 0]">
			<xsl:element name="span">
				<xsl:call-template name="commonattributes">
					<xsl:with-param name="default-output-class" select="'repsep'"/>
				</xsl:call-template>
				<xsl:apply-templates select="node()" />
			</xsl:element>
		</xsl:if>
	</xsl:template>
	<xsl:template match="option">
		<xsl:if test="node()[string-length() != 0]">
			<xsl:element name="span">
				<xsl:call-template name="commonattributes">
					<xsl:with-param name="default-output-class" select="'option'"/>
				</xsl:call-template>
				<xsl:apply-templates select="node()" />
			</xsl:element>
		</xsl:if>
	</xsl:template>
	<xsl:template match="parmname">
		<xsl:if test="node()[string-length() != 0]">
			<xsl:element name="span">
				<xsl:call-template name="commonattributes">
					<xsl:with-param name="default-output-class" select="'parmname'"/>
				</xsl:call-template>
				<xsl:apply-templates select="node()" />
			</xsl:element>
		</xsl:if>
	</xsl:template>
	<xsl:template match="apiname">
		<xsl:if test="node()[string-length() != 0]">
			<xsl:element name="span">
				<xsl:call-template name="commonattributes">
					<xsl:with-param name="default-output-class" select="'apiname'"/>
				</xsl:call-template>
				<xsl:apply-templates select="node()" />
			</xsl:element>
		</xsl:if>
	</xsl:template>
	<xsl:template match="varname">
		<xsl:if test="node()[string-length() != 0]">
			<xsl:element name="span">
				<xsl:call-template name="commonattributes">
					<xsl:with-param name="default-output-class" select="'varname'"/>
				</xsl:call-template>
				<xsl:apply-templates select="node()" />
			</xsl:element>
		</xsl:if>
	</xsl:template>

	<xsl:template match="userinput">
		<xsl:if test="node()[string-length() != 0]">
			<xsl:element name="span">
				<xsl:call-template name="commonattributes">
					<xsl:with-param name="default-output-class" select="'userinput'"/>
				</xsl:call-template>
				<xsl:value-of select="node()"/>
			</xsl:element>
		</xsl:if>
	</xsl:template>
	<xsl:template match="systemoutput">
		<xsl:if test="node()[string-length() != 0]">
			<xsl:element name="span">
				<xsl:call-template name="commonattributes">
					<xsl:with-param name="default-output-class" select="'systemoutput'"/>
				</xsl:call-template>
				<xsl:value-of select="node()"/>
			</xsl:element>
		</xsl:if>
	</xsl:template>
	<xsl:template match="cmdname">
		<xsl:if test="node()[string-length() != 0]">
			<xsl:element name="span">
				<xsl:call-template name="commonattributes">
					<xsl:with-param name="default-output-class" select="'cmdname'"/>
				</xsl:call-template>
				<xsl:apply-templates select="node()" />
			</xsl:element>
		</xsl:if>
	</xsl:template>

	<xsl:template match="filepath">
		<xsl:if test="node()[string-length() != 0]">
			<code class="filepath"><xsl:apply-templates select="node()"/></code>
		</xsl:if>
	</xsl:template>


	<!--<xsl:template match="codeblock">
    <pre>  
        <xsl:value-of select="node()"/>
    </pre>
  </xsl:template>-->

	<!--TODO: How should Cite DITA element styling look? Do these need to Link? -->
	<xsl:template match="cite">
		<em>
			<xsl:apply-templates />
		</em>
	</xsl:template>

	<xsl:template match="info">
		<div class="itemgroup info" id="{@id}">
			<xsl:apply-templates />
		</div>
	</xsl:template>

	<xsl:template match="choices">
		<ul>
			<xsl:for-each select="choice">
				<li>
					<xsl:apply-templates select="node()"/>
				</li>
			</xsl:for-each>
		</ul>
	</xsl:template>

	<xsl:template match="learningAssessment">
		<xsl:apply-templates select="/*/title">
			<xsl:with-param name="outputclass" select="'h1'"/>
		</xsl:apply-templates>
		<xsl:element name="hr"></xsl:element>
		<xsl:apply-templates select="learningAssessmentbody" />
	</xsl:template>

	<!--<xsl:template match="learningAssessment/title">
    <h1>
      <xsl:apply-templates />
    </h1>
  </xsl:template>-->

	<xsl:template match="learningAssessmentbody">
		<xsl:apply-templates select="./lcIntro/title"/>
		<xsl:apply-templates select="./lcInteraction"/>
	</xsl:template>

	<!--<xsl:template match="lcIntro/title">
    <h2>
      <xsl:apply-templates />
    </h2>
  </xsl:template>-->

	<xsl:template match="lcDuration">
		<!-- -->
	</xsl:template>

	<xsl:template match="lcInteraction">
		<xsl:apply-templates/>
	</xsl:template>

	<xsl:template match="lcSingleSelect">
		<form>
			<span class="question-header">
				<xsl:apply-templates select="lcQuestion"/>
			</span>
			<xsl:apply-templates select="lcAnswerOptionGroup" />
		</form>
	</xsl:template>

	<xsl:template match="lcAnswerOptionGroup">
		<xsl:apply-templates />
	</xsl:template>

	<xsl:template match="lcAnswerOption">
		<label style="display:block;">
			<input type="radio" onclick="return lcSingleSelect(event);">
				<xsl:attribute name="rel">
					<xsl:value-of select="@id"/>
				</xsl:attribute>
				<xsl:attribute name="name">question</xsl:attribute>
				<xsl:choose>
					<xsl:when test="./lcCorrectResponse">
						<xsl:attribute name="value">1</xsl:attribute>
					</xsl:when>
					<xsl:otherwise>
						<xsl:attribute name="value">0</xsl:attribute>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:apply-templates select="./lcAnswerContent"/>
			</input>
		</label>
		<xsl:choose>
			<xsl:when test="./lcCorrectResponse">
				<div class="validation" style="display:none;">
					<xsl:attribute name="id">
						<xsl:value-of select="@id"/>
					</xsl:attribute>
					<span class="correct" style="color:green;font-style:italic;">Correct!</span>
				</div>
			</xsl:when>
			<xsl:otherwise>
				<div class="validation" style="display:none;">
					<xsl:attribute name="id">
						<xsl:value-of select="@id"/>
					</xsl:attribute>
					<span class="incorrect" style="color:red;font-style:italic;">Incorrect!</span>
				</div>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="learningOverview">
		<xsl:apply-templates select="/*/title">
			<xsl:with-param name="outputclass" select="'h1'"/>
		</xsl:apply-templates>
		<xsl:element name="hr"></xsl:element>
		<xsl:apply-templates select="learningOverviewbody" />
	</xsl:template>

	<!--<xsl:template match="learningOverview/title">
    <header>
      <h1>
        <xsl:apply-templates />
      </h1>
    </header>
  </xsl:template>-->

	<xsl:template match="learningOverviewbody">
		<xsl:apply-templates select="lcObjectives"/>
	</xsl:template>

	<xsl:template match="lcObjectives">
		<xsl:apply-templates select="./title"/>
		<xsl:apply-templates select="lcObjectivesGroup"/>
	</xsl:template>

	<xsl:template match="lcObjectivesGroup">
		<ul class="hero-list">
			<xsl:for-each select="lcObjective">
				<li>
					<xsl:apply-templates />
				</li>
			</xsl:for-each>
		</ul>
	</xsl:template>

	<xsl:template match="learningSummary">
		<xsl:apply-templates select="/*/title">
			<xsl:with-param name="outputclass" select="'h1'"/>
		</xsl:apply-templates>
		<xsl:element name="hr"></xsl:element>
		<xsl:apply-templates select="learningSummarybody"/>
	</xsl:template>

	<xsl:template match="learningSummarybody">
		<xsl:apply-templates select="lcObjectives"/>
	</xsl:template>

	<!-- Specific Node Templates -->
	<xsl:template match="title">
		<xsl:param name="outputclass">
			<xsl:choose>
				<xsl:when test="@outputclass != ''">
					<xsl:value-of select="@outputclass"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="' '"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:param>
		<xsl:param name="id">
			<xsl:choose>
				<xsl:when test="@id != ''">
					<xsl:value-of select="@id"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="' '"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:param>
		<xsl:if test="normalize-space(.)">
			<xsl:choose>
				<xsl:when test="$outputclass = 'h1'">
					<h1 id="section-title">						<xsl:apply-templates />
					</h1>
				</xsl:when>
				<xsl:when test="$outputclass = 'h2'">
					<h2>
						<xsl:if test="normalize-space($id)"><xsl:attribute name="id"><xsl:value-of select="$id"/></xsl:attribute></xsl:if>
						<xsl:apply-templates />
					</h2>
				</xsl:when>
				<xsl:when test="$outputclass = 'h3'">
					<h3>
						<xsl:if test="normalize-space($id)"><xsl:attribute name="id"><xsl:value-of select="$id"/></xsl:attribute></xsl:if>
						<xsl:apply-templates />
					</h3>
				</xsl:when>
				<xsl:when test="$outputclass = 'h4'">
					<h4>
						<xsl:if test="normalize-space($id)"><xsl:attribute name="id"><xsl:value-of select="$id"/></xsl:attribute></xsl:if>
						<xsl:apply-templates />
					</h4>
				</xsl:when>
				<xsl:when test="$outputclass = 'h5'">
					<h5>
						<xsl:if test="normalize-space($id)"><xsl:attribute name="id"><xsl:value-of select="$id"/></xsl:attribute></xsl:if>
						<xsl:apply-templates />
					</h5>
				</xsl:when>
				<xsl:when test="$outputclass = 'h6'">
					<h6>
						<xsl:if test="normalize-space($id)"><xsl:attribute name="id"><xsl:value-of select="$id"/></xsl:attribute></xsl:if>
						<xsl:apply-templates />
					</h6>
				</xsl:when>
				<xsl:otherwise>
					<h2>
						<xsl:if test="normalize-space($id)"><xsl:attribute name="id"><xsl:value-of select="$id"/></xsl:attribute></xsl:if>
						<xsl:apply-templates />
					</h2>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:if>
	</xsl:template>

	<xsl:template match="title" mode="sectionTitle">
		<xsl:param name="outputclass">
			<xsl:choose>
				<xsl:when test="@outputclass != ''">
					<xsl:value-of select="@outputclass"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="' '"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:param>
		<xsl:param name="id">
			<xsl:choose>
				<xsl:when test="@id != ''">
					<xsl:value-of select="@id"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="' '"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:param>
		<xsl:param name="sectionNumber" />

		<xsl:if test="normalize-space(.)">
			<xsl:choose>
				<xsl:when test="$outputclass = 'h1'">
					<h1>
						<xsl:apply-templates />
					</h1>
				</xsl:when>
				<xsl:when test="$outputclass = 'h2'">
					<h2 class="scroll-to">
						<a class="go-to-top" href="#top">
							<i class="material-icons">keyboard_arrow_upward</i>
						</a>
						<!--<xsl:if test="$sectionNumber">
              <xsl:text>Section </xsl:text><xsl:value-of select="$sectionNumber"/><xsl:text>: </xsl:text>
            </xsl:if>-->
						<xsl:apply-templates/>
					</h2>
				</xsl:when>
				<xsl:when test="$outputclass = 'h3'">
					<h3>
						<xsl:apply-templates />
					</h3>
				</xsl:when>
				<xsl:when test="$outputclass = 'h4'">
					<h4>
						<xsl:apply-templates />
					</h4>
				</xsl:when>
				<xsl:when test="$outputclass = 'h5'">
					<h5>
						<xsl:apply-templates />
					</h5>
				</xsl:when>
				<xsl:when test="$outputclass = 'h6'">
					<h6>
						<xsl:apply-templates />
					</h6>
				</xsl:when>
				<xsl:otherwise>
					<h2 class="scroll-to">
						<a class="go-to-top" href="#top">
							<i class="material-icons">keyboard_arrow_upward</i>
						</a>
						<!--<xsl:if test="$sectionNumber">
              <xsl:text>Section </xsl:text><xsl:value-of select="$sectionNumber"/><xsl:text>: </xsl:text>
            </xsl:if>-->
						<xsl:apply-templates/>
					</h2>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:if>
	</xsl:template>

	<xsl:template match="term">
		<xsl:choose>
			<xsl:when test="text and not(text())">
				<xsl:call-template name="term-description"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:element name="span">
					<xsl:attribute name="Title">
						<xsl:value-of select="./text/text()"/>
					</xsl:attribute>
					<xsl:attribute name="class">
						<xsl:text>term</xsl:text>
					</xsl:attribute>
					<xsl:value-of select="text()"/>
				</xsl:element>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template name="term-description">
		<xsl:value-of select="./text/text()"/>
	</xsl:template>


	<xsl:template match="ul">
		<xsl:element name="ul">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'ul'"/>
			</xsl:call-template>
			<xsl:apply-templates/>
		</xsl:element>
	</xsl:template>

	<xsl:template match="li">
		<xsl:element name="li">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'li'"/>
			</xsl:call-template>
			<xsl:apply-templates/>
		</xsl:element>
	</xsl:template>
	<xsl:template match="ol">
		<xsl:element name="ol">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'ol'"/>
			</xsl:call-template>
			<xsl:apply-templates/>
		</xsl:element>
	</xsl:template>

	<xsl:template match="shortdesc">
		<p class="shortdesc"><xsl:apply-templates/></p>
	</xsl:template>

	<xsl:template match="fig">
		<xsl:variable name="currentFigure" select="."/>
		<xsl:element name="figure">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'fig'"/>
			</xsl:call-template>
			<xsl:if test="./title != '' and (p/image or svg-container or image)">
				<figcaption class="figcap">
					<strong>
						<em>
							<xsl:apply-templates select="./title"/>
						</em>
					</strong>
				</figcaption>
			</xsl:if>
			<xsl:choose>
				<xsl:when test="p/image">
					<xsl:apply-templates select="p/image"/>
				</xsl:when>
				<xsl:when test="svg-container">
					<xsl:apply-templates select="svg-container" />
				</xsl:when>
				<xsl:otherwise>
					<xsl:apply-templates select="image"/>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:apply-templates select="codeblock"/>
		</xsl:element>
	</xsl:template>

	<xsl:template match="fig/title">
		<xsl:apply-templates/>
	</xsl:template>

	<xsl:template match="section">
		<section class="content-section">
			<xsl:apply-templates select="node()"/>
		</section>
	</xsl:template>
	
	<xsl:template match="draft-comment">
		<xsl:choose>
			<xsl:when test="$DisplayDraftComments = 'true'">
				<!-- display draft comments -->
				<div class="draft-comment" style="background-color: #99FF99; border: 1pt black solid;">
					<strong>Draft comment: </strong>
					<xsl:value-of select="@author"/>
					<br/>
					<xsl:apply-templates />
				</div>
			</xsl:when>
			<xsl:otherwise>
				<!-- do nothing -->
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template match="p">
		<xsl:element name="p">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'p'"/>
			</xsl:call-template>
			<xsl:apply-templates select="node()"/>
		</xsl:element>
	</xsl:template>

	<!-- general DITA tag templates and some client specific ones - should be refactored -->
	<xsl:template match="lines">
		<p class="lines">
			<xsl:call-template name="replace">
				<xsl:with-param name="string" select="."/>
			</xsl:call-template>
		</p>
	</xsl:template>

	<xsl:template name="replace">
		<xsl:param name="string"/>
		<xsl:choose>
			<xsl:when test="contains($string,'&#10;')">
				<xsl:value-of select="substring-before($string,'&#10;')"/>
				<br/>
				<xsl:call-template name="replace">
					<xsl:with-param name="string" select="substring-after($string,'&#10;')"/>
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$string"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<!-- Notes - Google Materials Icon styling -->

	<!--<xsl:template match="note">
    <p class="small-text">
      <xsl:choose>
        <xsl:when test="@type = 'important'">
          <strong>Important: </strong>
        </xsl:when>
        <xsl:otherwise>
          <strong>Note: </strong>
        </xsl:otherwise>
      </xsl:choose>
      <xsl:apply-templates/>
    </p>
  </xsl:template>-->

	<xsl:template match="hazardstatement">
		<xsl:param name="type">
			<xsl:choose>
				<xsl:when test="@type != ''">
					<xsl:value-of select="@type"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="' '"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:param>
		<xsl:param name="title">
			<xsl:value-of select="concat(translate(substring($type,1,1), $vLower, $vUpper), substring($type, 2), substring(' ', 1 div not(position()=last())))"/>
		</xsl:param>
		<xsl:element name="div">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="concat('note hazardstatement ', @type, ' note_', @type)"/>
			</xsl:call-template>
			<table role="presentation" border="1" class="note hazardstatement">

				<xsl:choose>
					<xsl:when test="@type = 'warning'">
						<tr>
							<th colspan="2" class="hazardstatement--warning">
								<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" class="hazardsymbol" version="1.1" height="1em" viewBox="0 0 600 525">
									<metadata>
										<rdf:RDF>
											<cc:Work rdf:about="">
												<dc:format>image/svg+xml</dc:format>
												<dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type>
												<dc:title></dc:title>
											</cc:Work>
										</rdf:RDF>
									</metadata>
									<defs>
										<path d="M 2.8117,-1.046 A 3,3 0 0 1 0.5,2.958 V 4.5119 A 10.5,10.5 0 0 1 2,25.3078 v 0.5583 A 15,15 0 0 0 14.7975,8.5433 15,15 0 0 0 23.4007,-11.201 l -0.4835,0.2792 A 10.5,10.5 0 0 1 4.1574,-1.8229 z m 3.4148,8.871 a 10,10 0 0 1 -12.453,0 9.5,9.5 0 0 0 -2.1756,2.7417 13.5,13.5 0 0 0 16.8042,0 A 10,10 0 0 0 6.2265,7.825 z" transform="matrix(10,0,0,-10,260,260)"></path>
									</defs>
									<path d="M 597.6,499.6 313.8,8 C 310.9,3 305.6,0 299.9,0 294.2,0 288.9,3.1 286,8 L 2.2,499.6 c -2.9,5 -2.9,11.1 0,16 2.9,5 8.2,8 13.9,8 h 567.6 c 5.7,0 11,-3.1 13.9,-8 2.9,-5 2.9,-11.1 0,-16 z"></path>
									<polygon points="43.875,491.5 299.875,48.2 555.875,491.5 " transform="matrix(1,0,0,0.99591458,0.125,2.0332437)" style="fill:#f6bd16;fill-opacity:1;stroke:none;overflow:visible"></polygon>
									<path d="m -384.00937,417.52725 a 38.151581,36.156727 0 1 1 -76.30316,0 38.151581,36.156727 0 1 1 76.30316,0 z" transform="matrix(0.99319888,0,0,1.0479962,719.28979,-2.9357862)" style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.62514842;stroke-linecap:square;stroke-miterlimit:4;stroke-opacity:0.4;stroke-dasharray:none;stroke-dashoffset:0"></path>
									<path d="m 300,168.60074 c -20.64745,0 -37.26716,16.97292 -37.26716,38.05658 l 11.01897,133.31318 c 2.10449,17.24457 3.90184,27.0149 11.01898,31.60966 4.64712,2.1172 9.79468,3.32214 15.22921,3.32214 5.40832,0 10.53383,-1.1913 15.16343,-3.28925 7.15697,-4.58178 8.97556,-14.35941 11.08476,-31.64255 l 11.01898,-133.31318 c 0,-21.08366 -16.61973,-38.05658 -37.26717,-38.05658 z" style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.88582677;stroke-linecap:square;stroke-miterlimit:4;stroke-opacity:1;stroke-dashoffset:0"></path>
								</svg> WARNING
							</th>
						</tr>
					</xsl:when>
					<xsl:when test="@type = 'caution'">
						<tr>
							<th colspan="2" class="hazardstatement--caution">
								<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" class="hazardsymbol" version="1.1" height="1em" viewBox="0 0 600 525">
									<metadata>

										<rdf:RDF>

											<cc:Work rdf:about="">

												<dc:format>image/svg+xml</dc:format>

												<dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type>

												<dc:title></dc:title>
											</cc:Work>
										</rdf:RDF>
									</metadata>
									<defs>

										<path d="M 2.8117,-1.046 A 3,3 0 0 1 0.5,2.958 V 4.5119 A 10.5,10.5 0 0 1 2,25.3078 v 0.5583 A 15,15 0 0 0 14.7975,8.5433 15,15 0 0 0 23.4007,-11.201 l -0.4835,0.2792 A 10.5,10.5 0 0 1 4.1574,-1.8229 z m 3.4148,8.871 a 10,10 0 0 1 -12.453,0 9.5,9.5 0 0 0 -2.1756,2.7417 13.5,13.5 0 0 0 16.8042,0 A 10,10 0 0 0 6.2265,7.825 z" transform="matrix(10,0,0,-10,260,260)"></path>
									</defs>
									<path d="M 597.6,499.6 313.8,8 C 310.9,3 305.6,0 299.9,0 294.2,0 288.9,3.1 286,8 L 2.2,499.6 c -2.9,5 -2.9,11.1 0,16 2.9,5 8.2,8 13.9,8 h 567.6 c 5.7,0 11,-3.1 13.9,-8 2.9,-5 2.9,-11.1 0,-16 z"></path>
									<polygon points="43.875,491.5 299.875,48.2 555.875,491.5 " transform="matrix(1,0,0,0.99591458,0.125,2.0332437)" style="fill:#f6bd16;fill-opacity:1;stroke:none;overflow:visible"></polygon>
									<path d="m -384.00937,417.52725 a 38.151581,36.156727 0 1 1 -76.30316,0 38.151581,36.156727 0 1 1 76.30316,0 z" transform="matrix(0.99319888,0,0,1.0479962,719.28979,-2.9357862)" style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.62514842;stroke-linecap:square;stroke-miterlimit:4;stroke-opacity:0.4;stroke-dasharray:none;stroke-dashoffset:0"></path>
									<path d="m 300,168.60074 c -20.64745,0 -37.26716,16.97292 -37.26716,38.05658 l 11.01897,133.31318 c 2.10449,17.24457 3.90184,27.0149 11.01898,31.60966 4.64712,2.1172 9.79468,3.32214 15.22921,3.32214 5.40832,0 10.53383,-1.1913 15.16343,-3.28925 7.15697,-4.58178 8.97556,-14.35941 11.08476,-31.64255 l 11.01898,-133.31318 c 0,-21.08366 -16.61973,-38.05658 -37.26717,-38.05658 z" style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.88582677;stroke-linecap:square;stroke-miterlimit:4;stroke-opacity:1;stroke-dashoffset:0"></path>
								</svg> Caution
							</th>
						</tr>
					</xsl:when>
				</xsl:choose>
				<tr>
					<td class="hazard__icon__col">
						<xsl:call-template name="getHazardIcon">
							<xsl:with-param name="type" select="$type"/>
						</xsl:call-template>
					</td>
					<td class="hazard__message__col">
						<div class="messagepanel">
							<xsl:apply-templates/>
						</div>
					</td>
				</tr>
			</table>
		</xsl:element>
	</xsl:template>

	<xsl:template match="messagepanel">
		<ul class="ul messagepanel">
			<xsl:apply-templates/>
		</ul>
	</xsl:template>

	<xsl:template match="typeofhazard">
		<xsl:if test="node()[string-length() != 0]">
			<div class="typeofhazard">
				<xsl:apply-templates/>
			</div>
		</xsl:if>
	</xsl:template>

	<xsl:template match="howtoavoid">
		<xsl:if test="node()[string-length() != 0]">
			<div class="howtoavoid">
				<xsl:apply-templates/>
			</div>
		</xsl:if>
	</xsl:template>

	<xsl:template match="note">
		<xsl:variable name="type">
			<xsl:choose>
				<xsl:when test="@type != ''"><xsl:value-of select="@type"/></xsl:when>
				<xsl:otherwise>note</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:variable name="title">
			<xsl:choose>
				<xsl:when test="@othertype != '' and (contains(@othertype, 'Version') or contains(@othertype, 'Additional'))">
					<xsl:value-of select="@othertype"/>
				</xsl:when>
				<xsl:when test="@type = 'trouble'">Troubleshooting</xsl:when>
				<xsl:when test="@type = 'tip'">Tip</xsl:when>
				<xsl:when test="@type = 'warning'">Warning</xsl:when>
				<xsl:when test="@type = 'caution'">Caution</xsl:when>
				<xsl:when test="@type = 'danger'">Danger</xsl:when>
				<xsl:when test="@type = 'important'">Important</xsl:when>
				<xsl:otherwise>Note</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<div class="callout callout-{$type}" role="note">
			<p class="callout-title"><xsl:value-of select="$title"/></p>
			<div class="callout-body">
				<xsl:apply-templates/>
			</div>
		</div>
	</xsl:template>

	<xsl:template name="getNoteColor">
		<xsl:param name="type"/>
		<xsl:param name="otherType"/>
		<xsl:choose>
			<xsl:when test="$type = ''">primary</xsl:when>
			<xsl:when test="$type = 'attention'">primary</xsl:when>
			<xsl:when test="$type = 'caution'">alert-medium</xsl:when>
			<xsl:when test="$type = 'danger'">primary</xsl:when>
			<xsl:when test="$type = 'fastpath'">primary</xsl:when>
			<xsl:when test="$type = 'important'">alert-medium</xsl:when>
			<xsl:when test="$type = 'note'">primary</xsl:when>
			<xsl:when test="$type = 'notice'">primary</xsl:when>
			<xsl:when test="$type = 'other' and contains($otherType, 'Version Notes')">slate</xsl:when>
			<xsl:when test="$type = 'other' and contains($otherType, 'Additional Information')">alert-info</xsl:when>
			<xsl:when test="$type = 'remember'">primary</xsl:when>
			<xsl:when test="$type = 'restriction'">primary</xsl:when>
			<xsl:when test="$type = 'tip'">primary</xsl:when>
			<xsl:when test="$type = 'trouble'">alert-low</xsl:when>
			<xsl:when test="$type = 'warning'">alert-high</xsl:when>
			<xsl:otherwise>primary</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template name="getNoteIcon">
		<xsl:param name="type"/>
		<xsl:choose>
			<xsl:when test="$type = ''">
				<i class="fas fa-info-circle"></i>
			</xsl:when>
			<xsl:otherwise>
				<i class="fas fa-info-circle"></i>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template name="getHazardIcon">
		<xsl:param name="type"/>
		<xsl:choose>
			<xsl:when test="$type = ''">
				<img class="note__icon" src="resources/img/important.png" />
			</xsl:when>
			<xsl:when test="$type = 'attention'">
				<img class="note__icon" src="resources/img/important.png" />
			</xsl:when>
			<xsl:when test="$type = 'caution'">
				<img class="note__icon" src="Content/ditastylesheets/img/caution.png" />
			</xsl:when>
			<xsl:when test="$type = 'danger'">
				<img class="note__icon" src="Content/ditastylesheets/img/caution.png" />
			</xsl:when>
			<xsl:when test="$type = 'fastpath'">
				<img class="note__icon" src="Content/ditastylesheets/img/important.png" />
			</xsl:when>
			<xsl:when test="$type = 'important'">
				<img class="note__icon" src="Content/ditastylesheets/img/important.png" />
			</xsl:when>
			<xsl:when test="$type = 'note'">
				<img class="note__icon" src="Content/ditastylesheets/img/important.png" />
			</xsl:when>
			<xsl:when test="$type = 'notice'">
				<img class="note__icon" src="Content/ditastylesheets/img/important.png" />
			</xsl:when>
			<xsl:when test="$type = 'other'">
				<img class="note__icon" src="Content/ditastylesheets/img/important.png" />
			</xsl:when>
			<xsl:when test="$type = 'remember'">
				<img class="note__icon" src="Content/ditastylesheets/img/important.png" />
			</xsl:when>
			<xsl:when test="$type = 'restriction'">
				<img class="note__icon" src="Content/ditastylesheets/img/important.png" />
			</xsl:when>
			<xsl:when test="$type = 'tip'">
				<img class="note__icon" src="Content/ditastylesheets/img/tip.png" />
			</xsl:when>
			<xsl:when test="$type = 'trouble'">
				<img class="note__icon" src="Content/ditastylesheets/img/important.png" />
			</xsl:when>
			<xsl:when test="$type = 'warning'">
				<img class="note__icon" src="Content/ditastylesheets/img/warning.png" />
			</xsl:when>
			<xsl:otherwise>
				<img class="note__icon" src="Content/ditastylesheets/img/important.png" />
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template name="getNoteTitle">
		<xsl:param name="type"/>
		<xsl:choose>
			<xsl:when test="$type = ''">
				<xsl:text>Note: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'attention'">
				<xsl:text>Important: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'caution'">
				<xsl:text>Caution: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'danger'">
				<xsl:text>Warning: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'fastpath'">
				<xsl:text>Fastpath: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'important'">
				<xsl:text>Important: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'note'">
				<xsl:text>Note: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'notice'">
				<xsl:text>Notice: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'other'">
				<xsl:text>Note: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'remember'">
				<xsl:text>Remember: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'restriction'">
				<xsl:text>Restriction: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'tip'">
				<xsl:text>Tip: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'trouble'">
				<xsl:text>Troubleshooting: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'warning'">
				<xsl:text>Warning: </xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>Note: </xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<xsl:template name="getHazardTitle">
		<xsl:param name="type"/>
		<xsl:choose>
			<xsl:when test="$type = ''">
				<xsl:text>Important: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'attention'">
				<xsl:text>Important: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'caution'">
				<xsl:text>Caution: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'danger'">
				<xsl:text>Warning: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'fastpath'">
				<xsl:text>Fastpath: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'important'">
				<xsl:text>Important: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'note'">
				<xsl:text>Important: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'notice'">
				<xsl:text>Notice: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'other'">
				<xsl:text>Important: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'remember'">
				<xsl:text>Remember: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'restriction'">
				<xsl:text>Restriction: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'tip'">
				<xsl:text>Tip: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'trouble'">
				<xsl:text>Troubleshooting: </xsl:text>
			</xsl:when>
			<xsl:when test="$type = 'warning'">
				<xsl:text>Warning: </xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>Important: </xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<!-- description list templates -->
	<xsl:template match="dl">
		<xsl:element name="dl">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'dl'"/>
			</xsl:call-template>
			<xsl:apply-templates />
		</xsl:element>
	</xsl:template>

	<xsl:template match="dlentry">
		<xsl:apply-templates />
	</xsl:template>

	<xsl:template match="dt">
		<xsl:element name="dt">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'dt dlterm'"/>
			</xsl:call-template>
			<xsl:apply-templates/>
		</xsl:element>
	</xsl:template>

	<xsl:template match="dd">
		<xsl:element name="dd">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'dd'"/>
			</xsl:call-template>
			<xsl:apply-templates/>
		</xsl:element>
	</xsl:template>

	<!-- end description list templates -->

	<!-- table templates -->
	<xsl:template match="table">
		<div class="content-table">
			<xsl:element name="table">
				<xsl:call-template name="commonattributes">
					<xsl:with-param name="default-output-class" select="'table'"/>
				</xsl:call-template>
				<xsl:if test="./title != ''">
					<caption><xsl:value-of select="./title"/></caption>
				</xsl:if>
				<xsl:apply-templates select="./tgroup"/>
			</xsl:element>
		</div>
	</xsl:template>

	<xsl:template match="properties">
		<div class="table-wrap scroll">
			<table class="simpletable properties simpletableborder">
				<xsl:if test="not(prophead)">
					<thead align="left" style="display: table-header-group;">
						<tr class="sthead prophead">
							<th style="vertical-align:bottom;text-align:left;" class="stentry proptypehd">
								Parameter
							</th>
							<th style="vertical-align:bottom;text-align:left;" class="stentry propvaluehd">
								Value
							</th>
							<th style="vertical-align:bottom;text-align:left;" class="stentry propdeschd">
								Description
							</th>
						</tr>
					</thead>
				</xsl:if>
				<xsl:apply-templates />
			</table>
		</div>
	</xsl:template>
	<xsl:template match="prophead">
		<thead>
			<tr class="sthead prophead">
				<xsl:apply-templates />
			</tr>
		</thead>
	</xsl:template>
	<xsl:template match="proptypehd">
		<th style="vertical-align:bottom;text-align:left;" class="stentry proptypehd">
			<xsl:apply-templates />
		</th>
	</xsl:template>
	<xsl:template match="propvaluehd">
		<th style="vertical-align:bottom;text-align:left;" class="stentry propvaluehd">
			<xsl:apply-templates />
		</th>
	</xsl:template>
	<xsl:template match="propdeschd">
		<th style="vertical-align:bottom;text-align:left;" class="stentry propdeschd">
			<xsl:apply-templates />
		</th>
	</xsl:template>

	<xsl:template match="property">
		<tr class="strow property">
			<xsl:apply-templates />
		</tr>
	</xsl:template>
	<xsl:template match="proptype">
		<td class="stentry proptype">
			<xsl:apply-templates />
		</td>
	</xsl:template>
	<xsl:template match="propvalue">
		<td class="stentry propvalue">
			<xsl:apply-templates />
		</td>
	</xsl:template>
	<xsl:template match="propdesc">
		<td class="stentry propdesc">
			<xsl:apply-templates />
		</td>
	</xsl:template>

	<xsl:template match="choicetable">
		<div class="table-wrap">
			<xsl:element name="table">
				<xsl:if test="not(chhead)">
					<thead>
						<tr>
							<th>Option</th>
							<th>Description</th>
						</tr>
					</thead>
				</xsl:if>
				<xsl:apply-templates />
			</xsl:element>
		</div>
	</xsl:template>
	<xsl:template match="chhead">
		<thead>
			<tr>
				<xsl:apply-templates />
			</tr>
		</thead>
	</xsl:template>
	<xsl:template match="choptionhd">
		<th>
			<xsl:apply-templates />
		</th>
	</xsl:template>
	<xsl:template match="chdeschd">
		<th>
			<xsl:apply-templates />
		</th>
	</xsl:template>
	<xsl:template match="chrow">
		<tr>
			<xsl:apply-templates />
		</tr>
	</xsl:template>
	<xsl:template match="choption">

		<xsl:variable name="namest" select="substring(@namest, 4, 2)"/>
		<xsl:variable name="nameend" select="substring(@nameend, 4, 2)"/>
		<td class="entry">
			<xsl:attribute name="align">
				<xsl:value-of select="./@align"/>
			</xsl:attribute>
			<xsl:if test="./@namest">
				<xsl:attribute name="colspan">
					<xsl:value-of select="$nameend - $namest + 1"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:if test="./@morerows">
				<xsl:attribute name="rowspan">
					<xsl:value-of select="number(./@morerows) + 1"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:apply-templates />
		</td>
	</xsl:template>
	<xsl:template match="chdesc">
		<xsl:variable name="namest" select="substring(@namest, 4, 2)"/>
		<xsl:variable name="nameend" select="substring(@nameend, 4, 2)"/>
		<td class="entry">
			<xsl:attribute name="align">
				<xsl:value-of select="./@align"/>
			</xsl:attribute>
			<xsl:if test="./@namest">
				<xsl:attribute name="colspan">
					<xsl:value-of select="$nameend - $namest + 1"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:if test="./@morerows">
				<xsl:attribute name="rowspan">
					<xsl:value-of select="number(./@morerows) + 1"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:apply-templates />
		</td>
	</xsl:template>

	<xsl:template match="table/title">
		<xsl:apply-templates />
	</xsl:template>

	<xsl:template match="table/tgroup">
		<!--<xsl:apply-templates select="caption"/>-->
		<xsl:if test="//colspec">
			<colgroup>
				<!--<xsl:for-each select="colspec">
          <xsl:choose>
            <xsl:when test="@colwidth = '1*'">
              <col style="width:25%" />
            </xsl:when>
            <xsl:when test="@colwidth = '2*'">
              <col style="width:50%" />
            </xsl:when>
            <xsl:when test="@colwidth = '3*'">
              <col style="width:75%" />
            </xsl:when>
            <xsl:when test="@colwidth = '4*'">
              <col style="width:100%" />
            </xsl:when>
          </xsl:choose>
        </xsl:for-each>-->
			</colgroup>
		</xsl:if>
		<xsl:apply-templates select="thead"/>
		<xsl:apply-templates select="tbody">
			<xsl:with-param name="colSpan" select="./@cols"/>
		</xsl:apply-templates>
	</xsl:template>

	<xsl:template match="thead">
		<xsl:element name="thead">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'thead'"/>
			</xsl:call-template>
			<xsl:for-each select="row">
				<tr>
					<xsl:for-each select="entry">
						<xsl:apply-templates select="." mode="table-head"/>
					</xsl:for-each>
				</tr>
			</xsl:for-each>
			<!--<tr class="row">
	       <xsl:for-each select="row/entry">
	         <th>
	           <xsl:apply-templates />
	         </th>
	       </xsl:for-each>
	     </tr>-->
		</xsl:element>
	</xsl:template>

	<xsl:template match="tbody">
		<xsl:param name="colSpan"/>
		<xsl:element name="tbody">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="'tbody'"/>
			</xsl:call-template>
			<xsl:apply-templates />
		</xsl:element>
	</xsl:template>


	<xsl:template match="row">
		<xsl:element name="tr">
			<xsl:call-template name="commonattributes">
				<xsl:with-param name="default-output-class" select="''"/>
			</xsl:call-template>
			<xsl:apply-templates />
		</xsl:element>
	</xsl:template>

	<xsl:template match="entry">
		<xsl:variable name="entrycol" select="./@colname"/>
		<xsl:variable name="namest" select="substring(@namest, 4, 2)"/>
		<xsl:variable name="nameend" select="substring(@nameend, 4, 2)"/>
		<xsl:variable name="tgroupAlign" select="./ancestor::tgroup/@align"/>
		<td class="entry" test="{$entrycol}" test2="{./ancestor::tgroup/colspec[@colname='col1']/@align}">
			<xsl:call-template name="setid"/>
			<xsl:attribute name="align">
				<xsl:choose>
					<xsl:when test="./@align != ''">
						<xsl:value-of select="./@align"/>
					</xsl:when>
					<xsl:when test="$tgroupAlign != ''">
						<xsl:value-of select="$tgroupAlign"/>
					</xsl:when>
					<xsl:when test="$entrycol = 'col1'">
						<xsl:value-of select="./ancestor::tgroup/colspec[@colname='col1']/@align"/>
					</xsl:when>
					<xsl:when test="$entrycol = 'col2'">
						<xsl:value-of select="./ancestor::tgroup/colspec[@colname='col2']/@align"/>
					</xsl:when>
					<xsl:when test="$entrycol = 'col3'">
						<xsl:value-of select="./ancestor::tgroup/colspec[@colname='col3']/@align"/>
					</xsl:when>
					<xsl:when test="$entrycol = 'col4'">
						<xsl:value-of select="./ancestor::tgroup/colspec[@colname='col4']/@align"/>
					</xsl:when>
					<xsl:when test="$entrycol = 'col5'">
						<xsl:value-of select="./ancestor::tgroup/colspec[@colname='col5']/@align"/>
					</xsl:when>
					<xsl:when test="$entrycol = 'col6'">
						<xsl:value-of select="./ancestor::tgroup/colspec[@colname='col6']/@align"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="./ancestor::tgroup/colspec[@colname='{$entrycol}']/@align"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:if test="./@namest">
				<xsl:attribute name="colspan">
					<xsl:value-of select="$nameend - $namest + 1"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:if test="./@morerows">
				<xsl:attribute name="rowspan">
					<xsl:value-of select="number(./@morerows) + 1"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:apply-templates />
		</td>
	</xsl:template>

	<xsl:template match="entry" mode="table-head">
		<xsl:variable name="entrycol" select="./@colname"/>
		<xsl:variable name="namest" select="substring(@namest, 4, 2)"/>
		<xsl:variable name="nameend" select="substring(@nameend, 4, 2)"/>
		<th class="entry {./@align}">
			<xsl:call-template name="setid"/>
			<xsl:attribute name="align">
				<xsl:choose>
					<xsl:when test="./@align != ''">
						<xsl:value-of select="./@align"/>
					</xsl:when>
					<xsl:when test="$entrycol = 'col1'">
						<xsl:value-of select="./ancestor::tgroup/colspec[@colname='col1']/@align"/>
					</xsl:when>
					<xsl:when test="$entrycol = 'col2'">
						<xsl:value-of select="./ancestor::tgroup/colspec[@colname='col2']/@align"/>
					</xsl:when>
					<xsl:when test="$entrycol = 'col3'">
						<xsl:value-of select="./ancestor::tgroup/colspec[@colname='col3']/@align"/>
					</xsl:when>
					<xsl:when test="$entrycol = 'col4'">
						<xsl:value-of select="./ancestor::tgroup/colspec[@colname='col4']/@align"/>
					</xsl:when>
					<xsl:when test="$entrycol = 'col5'">
						<xsl:value-of select="./ancestor::tgroup/colspec[@colname='col5']/@align"/>
					</xsl:when>
					<xsl:when test="$entrycol = 'col6'">
						<xsl:value-of select="./ancestor::tgroup/colspec[@colname='col6']/@align"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="./ancestor::tgroup/colspec[@colname='{$entrycol}']/@align"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:if test="./@namest">
				<xsl:attribute name="colspan">
					<xsl:value-of select="$nameend - $namest + 1"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:if test="./@morerows">
				<xsl:attribute name="rowspan">
					<xsl:value-of select="number(./@morerows) + 1"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:apply-templates />
		</th>
	</xsl:template>
	<!-- end table templates -->

	<!-- simpletable templates -->
	<xsl:template match="simpletable">
		<div class="table-wrap scroll">
			<xsl:element name="table">
				<xsl:call-template name="commonattributes">
					<xsl:with-param name="default-output-class" select="'simpletable properties simpletableborder'"/>
				</xsl:call-template>
				<xsl:apply-templates />
			</xsl:element>
		</div>
	</xsl:template>

	<xsl:template match="sthead">
		<thead>
			<tr>
				<xsl:for-each select="stentry">
					<th>
						<xsl:apply-templates />
					</th>
				</xsl:for-each>
			</tr>
		</thead>
	</xsl:template>

	<xsl:template match="strow">
		<tr>
			<xsl:apply-templates />
		</tr>
	</xsl:template>

	<xsl:template match="stentry">
		<xsl:variable name="namest" select="substring(@namest, 4, 2)"/>
		<xsl:variable name="nameend" select="substring(@nameend, 4, 2)"/>
		<td class="entry">
			<xsl:attribute name="align">
				<xsl:value-of select="./@align"/>
			</xsl:attribute>
			<xsl:if test="./@namest">
				<xsl:attribute name="colspan">
					<xsl:value-of select="$nameend - $namest + 1"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:if test="./@morerows">
				<xsl:attribute name="rowspan">
					<xsl:value-of select="number(./@morerows) + 1"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:apply-templates />
		</td>

	</xsl:template>

	<xsl:template match="fn">
		<xsl:variable name="id" select="@id"/>
		<xsl:variable name="callout">
			<xsl:apply-templates select="." mode="callout"/>
		</xsl:variable>
		<sup>
			<xsl:text> </xsl:text>
			<xsl:element name="a">
				<xsl:attribute name="href">
					<xsl:value-of select="$ThisPageUrl"/>
					<xsl:text>#footnotes/</xsl:text>
					<xsl:value-of select="$callout"/>
				</xsl:attribute>
				<xsl:copy-of select="$callout"/>
			</xsl:element>
		</sup>
	</xsl:template>

	<xsl:template name="getFootnoteInternalID">
		<xsl:param name="ctx" />
		<xsl:value-of select="concat('fn',generate-id($ctx))"/>
	</xsl:template>

	<xsl:template match="fn" mode="callout">
		<xsl:variable name="current" select="."/>
		<xsl:choose>
			<xsl:when test="@callout">
				<xsl:value-of select="@callout"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:for-each select="$allFootnotes">
					<xsl:if test="generate-id(.) = generate-id($current)">
						<xsl:value-of select="position()"/>
					</xsl:if>
				</xsl:for-each>
				<!--<xsl:number select="count(key('footnotesByString', text()))+1"/>-->
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<!-- end simpletable templates-->

	<!-- simple list templates -->

	<xsl:template match="sl">
		<ul style="list-style-type:none;">
			<xsl:apply-templates/>
		</ul>
	</xsl:template>

	<xsl:template match="sli">
		<li>
			<xsl:apply-templates/>
		</li>
	</xsl:template>

	<xsl:template match="tm[@tmtype='tm']">
		<xsl:value-of select="."/>
		<xsl:text> ™</xsl:text>
	</xsl:template>
	<xsl:template match="tm[@tmtype='reg']">
		<xsl:value-of select="."/>
		<xsl:text> ®</xsl:text>
	</xsl:template>

	<xsl:template match="sl[@outputclass='twocol']">
		<xsl:variable name="count" select="ceiling(count(sli) div 2)"/>
		<div class="row">
			<div class="col-md-6">
				<ul style="list-style-type:none;">
					<xsl:for-each select="sli[position() &lt;= $count]" >
						<xsl:apply-templates select="."/>
					</xsl:for-each>
				</ul>
			</div>
			<div class="col-md-6">
				<ul style="list-style-type:none;">
					<xsl:for-each select="sli[position() &gt; $count]" >
						<xsl:apply-templates select="." />
					</xsl:for-each>
				</ul>
			</div>
		</div>
	</xsl:template>


	<xsl:template match="related-links">
		<xsl:if test="//link[@role='child']">
			<xsl:call-template name="child-links-section"/>
		</xsl:if>
		<!--<xsl:if test="//link[@role='parent']">
      <xsl:call-template name="parent-links-section"/>
    </xsl:if>-->
		<!--<xsl:if test="//link[@role='sibling'][@scope='local']">
      <xsl:call-template name="sibling-links-section"/>
    </xsl:if>-->
		<!-- roll general links into related links -->
		<xsl:if test="//link[@role='friend'] | //link[@role='sibling'][@scope='local'] | //link[@scope='external'] | //link[not(@role)][not(@scope)]">
			<xsl:call-template name="related-links-section"/>
		</xsl:if>

		<!--<xsl:if test="//link[not(@role)][not(@scope)]">
			<xsl:call-template name="general-links-section"/>
		</xsl:if>-->
	</xsl:template>

	<!--<xsl:template name="child-links-section">
    <ul class="ullinks">
      <xsl:for-each select="//link[@role='child']">
        <li class="link ulchildlink">
          <strong>
            <a class="link" href="{concat(@href, '.xml')}">
              <xsl:value-of select="linktext"/>
            </a>
          </strong>
          <br/>
          <xsl:apply-templates select="desc"/>
        </li>
      </xsl:for-each>
    </ul> 
  </xsl:template>-->

	<xsl:template name="child-links-section">
		<xsl:variable name="collectionType" select=".//linkpool[@collection-type != '']/@collection-type"/>
		<div class="card-wrap height-auto">
			<div class="card-inner white">
				<div class="card-bar accent-1">&#160;
					<xsl:text> </xsl:text>
				</div>
				<div class="content">
					<p class="h5 margin-20">
						<xsl:choose>
							<xsl:when test="$collectionType = 'sequence'">Follow these steps:</xsl:when>
							<xsl:when test="$collectionType = 'choice'">Choose one of the following:</xsl:when>
							<xsl:otherwise>This section includes:</xsl:otherwise>
						</xsl:choose>
					</p>
					<ul class="list-bordered">
						<xsl:for-each select="(//link)[@role='child']">
							<li>
								<xsl:call-template name="link_rendering">
									<xsl:with-param name="linkText">
										<xsl:if test="$collectionType = 'sequence'"><xsl:value-of select="position()"/>. </xsl:if>
										<xsl:value-of select="linktext"/>
									</xsl:with-param>
								</xsl:call-template>
							</li>
						</xsl:for-each>
					</ul>
				</div>
			</div>
		</div>
	</xsl:template>


	<!--<xsl:template name="parent-links-section">
    <div class="familylinks">
      <xsl:for-each select="//link[@role='parent']">
        <div class="parentlink">
          <strong>Parent topic:</strong>
          <a class="link" href="{concat(@href, '.xml')}">
            <xsl:value-of select="linktext"/>
          </a>
        </div>
      </xsl:for-each>
    </div>
  </xsl:template>-->

	<xsl:template name="sibling-links-section">
		<div class="row">
			<div class="col-md-9">
				<div class="border-box off-white">
					<h4 class="margin-half">Related Topics</h4>
					<ul class="no-bull no-margin">
						<xsl:for-each select="//link[@role='sibling'][@scope='local']">
							<li>
								<xsl:call-template name="link_rendering"/>
							</li>
						</xsl:for-each>
					</ul>
				</div>
			</div>
		</div>
	</xsl:template>

	<xsl:template name="related-links-section">
		<div class="card-wrap height-auto">
			<div class="card-inner white">
				<div class="card-bar accent-1">&#160;
					<xsl:text> </xsl:text>
				</div>
				<div class="content">
					<p class="h5 margin-20">Related Topics</p>
					<ul class="list-bordered">
						<xsl:for-each select="//link[@role='sibling'][@scope='local'] | //link[not(@role)][not(@scope)]">
							<li>
								<xsl:call-template name="link_rendering" />
							</li>
						</xsl:for-each>
						<xsl:for-each select="//link[@scope='external']">
							<li>
								<xsl:call-template name="link_rendering" >
									<xsl:with-param name="target" select="'_blank'"/>
								</xsl:call-template>
							</li>
						</xsl:for-each>
						<xsl:for-each select="//link[@role='friend'][generate-id() = generate-id(key('rellinks',.)[1])]">
							<li>
								<xsl:call-template name="link_rendering" />
							</li>
						</xsl:for-each>
					</ul>
				</div>
			</div>
		</div>
	</xsl:template>


	<xsl:template name="general-links-section">
		<div class="row">
			<div class="col-md-9">
				<div class="border-box off-white">
					<ul class="no-bull no-margin">
						<xsl:for-each select="//link[not(@role)][not(@scope)]">
							<li>
								<xsl:call-template name="link_rendering" />
							</li>
						</xsl:for-each>
					</ul>
				</div>
			</div>
		</div>
	</xsl:template>

	<xsl:template match="data/title">

	</xsl:template>

	<xsl:template match="p/image">
		<xsl:choose>
			<xsl:when test="@placement='break'">
				<br/>
				<xsl:call-template name="img_rendering"/>
				<br/>
			</xsl:when>
			<xsl:when test="contains(@href, '.svg') or contains(@href, '.svgz')">
				<xsl:element name="p">
					<xsl:attribute name="class">
						<xsl:value-of select="'img-wrap'"/>
					</xsl:attribute>
					<object id="@id" data="assets/{./@href}" type="image/svg+xml">
						<xsl:call-template name="img_rendering">
							<xsl:with-param name="alt" select="''"/>
							<xsl:with-param name="title" select="''"/>
							<xsl:with-param name="width" select="''"/>
						</xsl:call-template>
					</object>
				</xsl:element>
			</xsl:when>
			<xsl:otherwise>
				<xsl:call-template name="img_rendering"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<!-- ===== Inline/Break Image  ===== -->
	<!-- Output image with a wrapper element. CSS class can be customized as needed-->
	<xsl:template match="image[@placement = 'break']">
		<xsl:choose>
			<xsl:when test="contains(@href, '.svg') or contains(@href, '.svgz')">
				<xsl:element name="p">
					<xsl:attribute name="class">
						<xsl:value-of select="'img-wrap'"/>
					</xsl:attribute>
					<object id="@id" data="assets/{./@href}" type="image/svg+xml">
						<xsl:call-template name="img_rendering">
							<xsl:with-param name="alt" select="''"/>
							<xsl:with-param name="title" select="''"/>
							<xsl:with-param name="width" select="''"/>
						</xsl:call-template>
					</object>
				</xsl:element>
			</xsl:when>
			<xsl:otherwise>
				<xsl:element name="p">
					<xsl:attribute name="class">
						<xsl:value-of select="'img-wrap'"/>
					</xsl:attribute>
					<xsl:call-template name="img_rendering"/>
				</xsl:element>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<!-- ===== Inline/Break Image  ===== -->
	<!-- Output image with a wrapper element. CSS class can be customized as needed-->
	<xsl:template match="image[@placement = 'inline']">
		<xsl:choose>
			<xsl:when test="contains(@href, '.svg') or contains(@href, '.svgz')">
				<object id="@id" data="assets/{./@href}" type="image/svg+xml">
					<xsl:call-template name="img_rendering">
						<xsl:with-param name="alt" select="''"/>
						<xsl:with-param name="title" select="''"/>
						<xsl:with-param name="width" select="''"/>
						<xsl:with-param name="class" select="'inline'"/>
					</xsl:call-template>
				</object>
			</xsl:when>
			<xsl:otherwise>
				<xsl:call-template name="img_rendering">
					<xsl:with-param name="class" select="'inline'"/>
				</xsl:call-template>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<!-- ===== Image ===== -->
	<!-- Output image with a wrapper element. CSS class can be customized as needed-->
	<xsl:template match="image">
		<xsl:choose>
			<xsl:when test="contains(@href, '.svg') or contains(@href, '.svgz')">
				<xsl:element name="p">
					<xsl:call-template name="commonattributes">
						<xsl:with-param name="default-output-class" select="'img-wrap'"/>
					</xsl:call-template>
					<object id="@id" data="assets/{./@href}" type="image/svg+xml">
						<xsl:call-template name="img_rendering">
							<xsl:with-param name="alt" select="''"/>
							<xsl:with-param name="title" select="''"/>
							<xsl:with-param name="width" select="''"/>
						</xsl:call-template>
					</object>
				</xsl:element>
			</xsl:when>
			<xsl:when test="@placement = 'inline'">
				<xsl:call-template name="img_rendering"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:element name="p">
					<xsl:call-template name="commonattributes">
						<xsl:with-param name="default-output-class" select="'img-wrap'"/>
					</xsl:call-template>
					<xsl:call-template name="img_rendering"/>
				</xsl:element>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<!-- ===== Imagemap Image  ===== -->
	<xsl:template match="imagemap/image">
		<xsl:call-template name="img_rendering">
			<xsl:with-param name="usemap">
				<xsl:value-of select="concat('#map_', @id)"/>
			</xsl:with-param>
			<xsl:with-param name="class">
				<xsl:value-of select="'image map'"/>
			</xsl:with-param>
			<xsl:with-param name="id">
				<xsl:value-of select="concat('imagemap__', @id)"/>
			</xsl:with-param>
		</xsl:call-template>
	</xsl:template>



	<!-- identity transform -->
	<xsl:template match="@* | node()">
		<xsl:copy>
			<xsl:apply-templates select="@* | node()"/>
		</xsl:copy>
	</xsl:template>
	<!-- ===== Template test if node/text is null or empty ===== -->
	<xsl:template match="text()[normalize-space()][1]">
		<xsl:if test=". != ''">
			<xsl:value-of select="."/>
		</xsl:if>
	</xsl:template>

	<!-- ===== Set ID attribute ===== -->
	<xsl:template name="setid">
		<xsl:if test="@id">
			<xsl:attribute name="id">
				<xsl:value-of select="@id"/>
			</xsl:attribute>
		</xsl:if>
	</xsl:template>

	<!-- ===== Process standard attributes that may appear anywhere. ===== -->
	<!-- Can be extended as needed -->
	<xsl:template name="commonattributes">
		<xsl:param name="default-output-class"/>
		<!-- Handle ID attribute -->
		<xsl:if test="@id">
			<xsl:attribute name="id">
				<xsl:value-of select="@id"/>
			</xsl:attribute>
		</xsl:if>
		
		<!-- Maintain existing output class functionality -->
		<xsl:apply-templates select="." mode="set-output-class">
			<xsl:with-param name="default" select="$default-output-class"/>
		</xsl:apply-templates>
		
		<!-- Process all attributes dynamically as data-* attributes -->
		<xsl:for-each select="@*">
			<!-- Skip attributes that already have special handling -->
			<xsl:if test="name() != 'id' and name() != 'class' and name() != 'outputclass'">
				<xsl:attribute name="data-{name()}">
					<xsl:value-of select="."/>
				</xsl:attribute>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>

	<!-- ===== Checks to see if xml node has a custom outputclass and appends it to default if passed in template. The default for a class of elements
       may be passed in with $default. ===== -->
	<xsl:template match="*" mode="set-output-class">
		<xsl:param name="default"/>
		<xsl:variable name="outputclass-attribute">
			<xsl:value-of select="@outputclass"/>
		</xsl:variable>
		<xsl:attribute name="class">
			<xsl:value-of select="normalize-space(concat($default,' ',$outputclass-attribute))"/>
		</xsl:attribute>
	</xsl:template>

	<!-- ===== Get output class attribute from xml node ===== -->
	<xsl:template match="@outputclass" mode="get-value-for-class">
		<xsl:value-of select="."/>
	</xsl:template>

	<xsl:template name="img_rendering">
		<xsl:param name="src" select="./@href"/>
		<xsl:param name="alt" select="./alt/text()[1]"/>
		<xsl:param name="title" select="./alt/text()[1]"/>
		<xsl:param name="width" select="./@width"/>
		<xsl:param name="class" select="''"/>
		<xsl:param name="usemap" select="''"/>
		<xsl:param name="id" select="''"/>
		<img src="{$src}" alt="{$alt}" title="{$title}" width="{$width}" class="{$class}" usemap="{$usemap}" id="{$id}"/>
	</xsl:template>
	
	<xsl:template name="link_rendering">
		<xsl:param name="href" select="@href" />
		<xsl:param name="linkText" select="linktext" />
		<xsl:param name="target" />
		<xsl:element name="a">
			<xsl:if test="normalize-space($target)">
				<xsl:attribute name="target">
					<xsl:value-of select="$target"/>
				</xsl:attribute>
			</xsl:if>
			<xsl:variable name="path">
				<xsl:choose>
					<xsl:when test="contains($href, '#')">
						<xsl:value-of select="substring-before($href, '#')"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$href"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>
			
			<xsl:variable name="pageUrl">
				<xsl:choose>
					<xsl:when test="normalize-space($path) != ''">
						<xsl:choose>
							<xsl:when test="starts-with($path, 'x') and string(number(substring-after($path, 'x'))) != 'NaN'">
								<xsl:value-of select="concat($path, '.xml')"/>
							</xsl:when>
							<xsl:otherwise>
								<xsl:value-of select="$path"/>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$ThisPageUrl"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>
			
			<xsl:variable name="bookmark" select="substring-after($href, '#')"></xsl:variable>
			
			<xsl:variable name="masterBookmark">
				<xsl:choose>
					<xsl:when test="contains($bookmark, '/')">
						<xsl:value-of select="substring-after($bookmark, '/')"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$bookmark"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>
			
			<xsl:attribute name="href">
				<xsl:choose>
					<xsl:when test="$bookmark = ''">
						<xsl:value-of select="$pageUrl"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="concat($pageUrl, concat('#', $masterBookmark))"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:choose>
				<xsl:when test="$linkText != ''">
					<xsl:value-of select="$linkText"/>
				</xsl:when>
				<xsl:when test="$bookmark = ''">
					<xsl:value-of select="$pageUrl"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="concat($pageUrl, concat('#', $masterBookmark))"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:element>
		
	</xsl:template>
	
	<!-- do nothing for required-cleanup and its children -->
	<xsl:template match="required-cleanup"/>

	<xsl:template match="svg-container">
		<div class="svg">
			<img src="{svgref/@href}" alt="{../title}" style="width: 100%; height:100%" />
		</div>
	</xsl:template>
</xsl:stylesheet>
