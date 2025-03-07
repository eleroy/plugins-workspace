<script>
  import { open, save, confirm, message } from "@tauri-apps/plugin-dialog";
  import { readFile } from "@tauri-apps/plugin-fs";

  export let onMessage;
  export let insecureRenderHtml;
  let defaultPath = null;
  let filter = null;
  let multiple = false;
  let directory = false;

  function arrayBufferToBase64(buffer, callback) {
    var blob = new Blob([buffer], {
      type: "application/octet-binary",
    });
    var reader = new FileReader();
    reader.onload = function (evt) {
      var dataurl = evt.target.result;
      callback(dataurl.substr(dataurl.indexOf(",") + 1));
    };
    reader.readAsDataURL(blob);
  }

  async function prompt() {
    confirm("Do you want to do something?")
      .then((res) => onMessage(res ? "Yes" : "No"))
      .catch(onMessage);
  }

  async function promptCustom() {
    confirm("Is Tauri awesome?", {
      okLabel: "Absolutely",
      cancelLabel: "Totally",
    })
      .then((res) =>
        onMessage(
          res ? "Tauri is absolutely awesome" : "Tauri is totally awesome"
        )
      )
      .catch(onMessage);
  }

  async function msg() {
    await message("Tauri is awesome!");
  }

  function openDialog() {
    open({
      title: "My wonderful open dialog",
      defaultPath,
      filters: filter
        ? [
            {
              name: "Tauri Example",
              extensions: filter.split(",").map((f) => f.trim()),
            },
          ]
        : [],
      multiple,
      directory,
    })
      .then(function (res) {
        if (Array.isArray(res)) {
          onMessage(res);
        } else {
          var pathToRead = res;
          var isFile = pathToRead.match(/\S+\.\S+$/g);
          readFile(pathToRead)
            .then(function (response) {
              if (isFile) {
                if (
                  pathToRead.includes(".png") ||
                  pathToRead.includes(".jpg") ||
                  pathToRead.includes(".jpeg")
                ) {
                  arrayBufferToBase64(
                    new Uint8Array(response),
                    function (base64) {
                      var src = "data:image/png;base64," + base64;
                      insecureRenderHtml('<img src="' + src + '"></img>');
                    }
                  );
                } else {
                  onMessage(res);
                }
              } else {
                onMessage(res);
              }
            })
            .catch(onMessage(res));
        }
      })
      .catch(onMessage);
  }

  function saveDialog() {
    save({
      title: "My wonderful save dialog",
      defaultPath,
      filters: filter
        ? [
            {
              name: "Tauri Example",
              extensions: filter.split(",").map((f) => f.trim()),
            },
          ]
        : [],
    })
      .then(onMessage)
      .catch(onMessage);
  }
</script>

<div class="flex gap-2 children:grow">
  <input
    class="input"
    id="dialog-default-path"
    placeholder="Default path"
    bind:value={defaultPath}
  />
  <input
    class="input"
    id="dialog-filter"
    placeholder="Extensions filter, comma-separated"
    bind:value={filter}
  />
</div>

<br />
<div>
  <input type="checkbox" id="dialog-multiple" bind:checked={multiple} />
  <label for="dialog-multiple">Multiple</label>
</div>
<div>
  <input type="checkbox" id="dialog-directory" bind:checked={directory} />
  <label for="dialog-directory">Directory</label>
</div>
<br />
<button class="btn" id="open-dialog" on:click={openDialog}>Open dialog</button>
<button class="btn" id="save-dialog" on:click={saveDialog}
  >Open save dialog</button
>
<button class="btn" id="prompt-dialog" on:click={prompt}>Prompt</button>
<button class="btn" id="custom-prompt-dialog" on:click={promptCustom}
  >Prompt (custom)</button
>
<button class="btn" id="message-dialog" on:click={msg}>Message</button>
