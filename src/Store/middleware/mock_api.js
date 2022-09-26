var templates_list = require("../data/templates.json");
var audio_list = require("../data/audios.json");
var image_list = require("../data/images.json");

function get_mock_response(url, method, data) {
  if (url === "/editor/fetch_templates/") {
    var response = {
      data: {
        templates: templates_list,
      },
      status: 200,
    };
    return response;
  } else if (url === "/editor/fetch_audios/") {
    var response = {
      data: {
        audios: audio_list,
      },
      status: 200,
    };
    return response;
  } else if (url === "/editor/fetch_images/") {
    var response = {
      data: {
        images: image_list,
      },
      status: 200,
    };
    return response;
  } else {
    throw "Undefined url.";
  }
}

export function api_mock(url, method, data) {
  return new Promise((resolve) => {
    // wait 3s before calling fn(par)
    setTimeout(() => resolve(get_mock_response(url, method, data)), 1000);
  });
}
