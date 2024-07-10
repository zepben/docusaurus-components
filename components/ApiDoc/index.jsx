/*
 * Copyright 2021 Zeppelin Bend Pty Ltd
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// @ts-check

import React, {useEffect} from "react";
import "swagger-ui/dist/swagger-ui.css";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useGlobalData from "@docusaurus/useGlobalData";
import useBaseUrl from "@docusaurus/useBaseUrl"
import {find} from "lodash";

const Ui = ({specUrl, documentUrl}) => {
    const {siteConfig} = useDocusaurusContext();
    const globalData = useGlobalData();

    let formattedSpecUrl;
    if (typeof window !== "undefined") {
        const regex = RegExp(`${siteConfig.baseUrl}(.*)${documentUrl}`, 'g');
        const match = regex.exec(window.location.href);
        if (match != null) {
            formattedSpecUrl = useBaseUrl(["spec", match[1], specUrl].join("/"));
        } else {
            const lastVersion = find(globalData["docusaurus-plugin-content-docs"].default.versions, v => v.isLast === true);
            formattedSpecUrl = useBaseUrl(["spec", lastVersion.name === "current" ? "next": lastVersion.name, specUrl].join("/"));
        }
    }

    useEffect(() => {
        setTimeout(() => {
            const containerId = `swagger-ui`;
            if (!document.getElementById(containerId)) {
                const swaggerContainer = document.createElement("div");
                swaggerContainer.id = containerId;
                document.getElementById("api-doc").appendChild(swaggerContainer);
                if (typeof window !== undefined) {
                    import("swagger-ui")
                        .then(SwaggerUI => {
                            SwaggerUI.default({
                                url: formattedSpecUrl,
                                dom_id: `#${containerId}`,
                                defaultModelsExpandDepth: 1,
                                docExpansion: "list",
                            });
                        })
                }
            }
        }, 500);
    }, []);

    return <div id={"api-doc"}/>
}

export default Ui;
