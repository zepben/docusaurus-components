/*
 * Copyright 2021 Zeppelin Bend Pty Ltd
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useEffect} from "react";
import "swagger-ui/dist/swagger-ui.css";
import SwaggerUI from 'swagger-ui';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useGlobalData from "@docusaurus/useGlobalData";
import {find} from "lodash";

const Ui = ({specUrl, documentUrl}) => {
    const {siteConfig} = useDocusaurusContext();
    const globalData = useGlobalData();

    useEffect(() => {
        setTimeout(() => {
            let formattedSpecUrl;
            const result = document.evaluate("/html/body/div/nav/div[1]/div[2]/div[1]/a/text()", document, null, XPathResult.STRING_TYPE).stringValue;
            if (result !== "") {
                formattedSpecUrl = siteConfig.baseUrl + ["spec", result, specUrl].join("/");
            } else {
                const lastVersion = find(globalData["docusaurus-plugin-content-docs"].default.versions, v => v.isLast === true);
                formattedSpecUrl = siteConfig.baseUrl + ["spec", lastVersion.name === "current" ? "next" : lastVersion.name, specUrl].join("/");
            }

            const containerId = `swagger-ui`;
            if (!document.getElementById(containerId)) {
                const swaggerContainer = document.createElement("div");
                swaggerContainer.id = containerId;
                document.getElementById("api-doc").appendChild(swaggerContainer);
                SwaggerUI({
                    url: formattedSpecUrl,
                    dom_id: `#${containerId}`,
                    defaultModelsExpandDepth: 1,
                    docExpansion: "list",
                });
            }
        }, 500);
    }, []);

    return <div id={"api-doc"}/>
}

export default Ui;
