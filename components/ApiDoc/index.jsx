/*
 * Copyright 2021 Zeppelin Bend Pty Ltd
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useGlobalData from "@docusaurus/useGlobalData";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { find } from "lodash";

const Ui = ({ specUrl, documentUrl }) => {
    const { siteConfig } = useDocusaurusContext();
    const globalData = useGlobalData();

    let formattedSpecUrl;

    if (typeof window !== "undefined") {
        const regex = new RegExp(`${siteConfig.baseUrl}(.*)${documentUrl}`, "g");
        const match = regex.exec(window.location.href);

        if (match) {
            formattedSpecUrl = useBaseUrl(
              ["spec", match[1], specUrl].join("/")
            );
        } else {
            const lastVersion = find(
              globalData["docusaurus-plugin-content-docs"].default.versions,
              (v) => v.isLast === true
            );

            formattedSpecUrl = useBaseUrl(
              [
                  "spec",
                  lastVersion.name === "current" ? "next" : lastVersion.name,
                  specUrl,
              ].join("/")
            );
        }
    }

    if (!formattedSpecUrl) {
        return null; // avoid SSR crash
    }

    return (
      <SwaggerUI
        url={formattedSpecUrl}
        defaultModelsExpandDepth={1}
        docExpansion="list"
      />
    );
};

export default Ui;
