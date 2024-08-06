// TwinBox v10.0
// (C) datkat21, Envy ISDX 2024

let WinBox = window.WinBox;
import { micaMake, micaMove } from "../../libs/mica.js";

export default async function TwinBox(args) {
  if (typeof args !== "object") throw new Error("Bad winbox arguments");
  let obj = {};
  for (const key in args) {
    obj[key] = args[key];
  }

  // add to desktop automatically
  if (obj["root"] === undefined) {
    obj["root"] = document.querySelector(".window-box");
  }

  if (obj["x"] === undefined && obj["y"] === undefined) {
    obj["x"] = "center";
    obj["y"] = "center";
  }

  // custom mica handler
  if (obj["mica"]) {
    if (obj["mica"] === true) {
      obj["mica"] = undefined;
      obj["oncreate"] = micaMake;
      obj["onmove"] = micaMove;
    }
  }

  // add padding if wanted
  if (obj["padding"]) {
    if (obj["padding"] === true) {
      obj["padding"] = undefined;
      if (obj["class"]) {
      } else {
        obj["class"] = "padded";
      }
    }
  }

  if (obj["bottom"] === undefined) {
    obj["bottom"] = "60px";
  }

  // animated closing
  if (obj["onclose"] === undefined) {
    obj["onclose"] = function onclose() {
      this.g.classList.add("popDown");

      setTimeout(() => {
        this.onclose = null;
        this.close();
      }, 500);

      return true;
    };
  }

  if (obj['onminimize'] === undefined) {
    obj['onminimize'] = function() {
      return true;
    }
  }

  let wb = new WinBox(obj);

  // if (obj["style"]) {
  //   /**
  //    * the plan:
  //    *
  //    * 1. move elements inside the winbox into a temp one.
  //    * 2. place the temp element inside the winbox container
  //    * 3. shadow the temp element
  //    * 4. set the .g and .body to the ones inside the temp
  //    */

  //   const shadowDiv = document.createElement("div");
  //   const oldG = wb.g;

  //   shadowDiv.appendChild(oldG);

  //   const winboxStyles = await fetch("/libs/winboxShadow.css").then((t) =>
  //     t.text()
  //   );

  //   // function forkChildren() {
  //   //   for (const child of oldG.children) {
  //   //     shadowDiv.appendChild(child);
  //   //   }
  //   // }
  //   // function forkShadowChildren(newDiv) {
  //   //   for (const child of shadowDiv.children) {
  //   //     newDiv.appendChild(child);
  //   //   }
  //   // }

  //   // forkChildren();

  //   // wb.g = shadowDiv;

  //   // oldG.appendChild(shadowDiv);

  //   // const shadow = oldG.attachShadow({
  //   //   mode: "closed",
  //   // });

  //   // forkChildren();

  //   // console.log("MYSTERIOUS SHADOW", shadow);

  //   // forkShadowChildren(shadow);

  //   // requestAnimationFrame(() => {
  //   //   forkChildren();
  //   //   forkShadowChildren(shadow);
  //   // });

  //   const newShadow = document.querySelector(".window-box").attachShadow({
  //     mode: "closed",
  //   });

  //   const shadowStyle = document.createElement("style");
  //   shadowStyle.innerHTML = winboxStyles;

  //   newShadow.appendChild(shadowStyle);

  //   newShadow.appendChild(shadowDiv);

  //   return wb;
  // }

  return {
    wb,
    body: wb.body,
  };
}
