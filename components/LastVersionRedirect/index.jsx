/*
 * Copyright 2021 Zeppelin Bend Pty Ltd
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from "react";
import "swagger-ui/dist/swagger-ui.css";
import useGlobalData from "@docusaurus/useGlobalData";
import { find } from "lodash";
import { Redirect } from "@docusaurus/router";

const Ui = () => {
    const globalData = useGlobalData();
    const lastVersion = find(globalData["docusaurus-plugin-content-docs"].default.versions, v => v.isLast === true);

    return <Redirect to={lastVersion.path}/>
}

export default Ui;
