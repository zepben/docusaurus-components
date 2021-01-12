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
import useBaseUrl from "@docusaurus/useBaseUrl";

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useGlobalData from "@docusaurus/useGlobalData";
import {find} from "lodash";

const Ui = ({specUrl, documentUrl}) => {
    const {siteConfig} = useDocusaurusContext();
    const globalData = useGlobalData();

    const regex = RegExp(`${siteConfig.baseUrl}(.*)${documentUrl}`, 'g');
    const match = regex.exec(window.location.href);
    let formattedSpecUrl;
    if (match != null) {
        formattedSpecUrl = useBaseUrl(["spec", match[1], specUrl].join("/"));
    } else {
        const lastVersion = find(globalData["docusaurus-plugin-content-docs"].default.versions, v => v.isLast === true);
        formattedSpecUrl = useBaseUrl(["spec", lastVersion.name, specUrl].join("/"));
    }

    useEffect(() => {
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
    }, []);

    return <div id={"api-doc"}/>
}

export default Ui;
