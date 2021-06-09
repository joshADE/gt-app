import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleDarkmode, toggleStickyHeader } from "../redux/index";
import { CustomInput } from "reactstrap";
import GPASettings from "./GPASettings";
import App from "../App";
import ImportExportSettings from "./ImportExportSettings";
function Settings() {
  const { darkmode, stickyHeader } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const changeDarkmode = () => {
    dispatch(toggleDarkmode());
  };

  const changeStickyHeader = () => {
    dispatch(toggleStickyHeader());
  };

  useEffect(() => {
    localStorage.setItem(
      App.localStorageKey + "darkmode",
      JSON.stringify(darkmode)
    );
  }, [darkmode]);

  useEffect(() => {
    localStorage.setItem(
      App.localStorageKey + "stickyHeader",
      JSON.stringify(stickyHeader)
    );
  }, [stickyHeader]);

  return (
    <div>
      <ImportExportSettings />
      <hr />
      <CustomInput
        checked={darkmode}
        onChange={changeDarkmode}
        type="switch"
        id="nightModeSwitch"
        name="nightModeSwitch"
        label="Toggle NightMode"
      />

      <CustomInput
        checked={stickyHeader}
        onChange={changeStickyHeader}
        type="switch"
        id="stickyHeaderSwitch"
        name="stickyHeaderSwitch"
        label="Sticky Row Headings (when scrolling left or right)"
      />
      <hr />
      <GPASettings />
    </div>
  );
}

export default Settings;
