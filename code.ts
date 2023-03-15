// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { title: "Gradify", width: 275, height: 320, themeColors: !0 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async (msg) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.

  await figma.loadFontAsync({ family: "Rubik", style: "Regular" })
  if (msg.type === 'create-gradients') {
    const node: SceneNode[] = [];
    console.log("code ts: palette no" + msg.palette)
    console.log("code ts: angle no" + msg.angle)

    //HUE GRADIENT GENRATOR
    //color lib : pastel colors
    const colorlib1 = ["#EDF2FB", "#CCDBFD", "#ABC4FF", "#FFC09F", "#A0CED9", "#ADF7B6", "#FFEE93", "#DDEDEA", "#DAEAF6", "#E8DFF5", "#BBD6B8", "#F7C8E0", "#B9F3FC", "#F1F7B5"]
    //dark colors 
    const colorlib2 = ["#865DFF", "#16FF00", "#8DCBE6", "#F3CCFF", "#00F5FF", "#00FFD1", "#F637EC", "#FF4949", "#00FFAB"]
    const colorlib3 = ["#AD7BE9", "#AD7BE9", "#8BF5FA", "#3F979B", , "#93BFCF", "#A084DC", "#82AAE3", "#00E7FF", "#F6F6C9", "#9F73AB", "#CDFCF6", "#FFD124", "#99FEFF"]
    const colorlib4 = ["#0035FF", "#FF8993", "#8900C9", "#00E5E0"]
    function rand() {
      return Math.floor(Math.random() * 11)
    }
    // console.log(rand) 
    // console.log(colorlib[rand()]) 
    let hexCol1
    let hexCol2
    const tintNode = figma.createEllipse()
    tintNode.resize(150, 150)
    switch (msg.palette) {
      case "1":
        hexCol1 = colorlib1[rand()]
        hexCol2 = colorlib1[rand()]
        if (hexCol1 == hexCol2) {
          hexCol1 = colorlib1[rand()]
          hexCol2 = colorlib1[rand()]
        }
        break;

      case "2":
        hexCol1 = colorlib2[rand()]
        hexCol2 = colorlib2[rand()]
        if (hexCol1 == hexCol2) {
          hexCol1 = colorlib1[rand()]
          hexCol2 = colorlib1[rand()]
        }
        break;

      case "3":
        hexCol1 = colorlib2[rand()]
        hexCol2 = colorlib2[rand()]
        if (hexCol1 == hexCol2) {
          hexCol1 = colorlib1[rand()]
          hexCol2 = colorlib1[rand()]
        }
        break;
      case "4":
        hexCol1 = colorlib2[rand()]
        hexCol2 = colorlib2[rand()]
        if (hexCol1 == hexCol2) {
          hexCol1 = colorlib1[rand()]
          hexCol2 = colorlib1[rand()]
        }
        break;
    }

    console.log(hexCol1)
    console.log(hexCol2)
    const hexToRBG = (hex: string | undefined) => {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    const color1R = hexToRBG(hexCol1).r / 255
    const color1G = hexToRBG(hexCol1).g / 255
    const color1B = hexToRBG(hexCol1).b / 255
    const color2R = hexToRBG(hexCol2).r / 255
    const color2G = hexToRBG(hexCol2).g / 255
    const color2B = hexToRBG(hexCol2).b / 255
    const DEFAULT_AFFINE_TRANSFORMS = {
      "0": [
        [0, -1, 1],
        [1, 0, 0.5],
      ],
      "45": [
        [0.5, -0.5, 0.5],
        [0.5, 0.5, 0],
      ],
      "90": [
        [1, 0, 0],
        [0, 1, 0.5],
      ],
      "135": [
        [0.5, 0.5, 0],
        [-0.5, 0.5, 0.5],
      ],
      "180": [
        [0, 1, 0],
        [-1, 0, 1.5],
      ],
      "225": [
        [-0.5, 0.5, 0.5],
        [-0.5, -0.5, 1],
      ],
      "270": [
        [-1, 0, 1],
        [0, -1, 1.5],
      ],
      "315": [
        [-0.5, -0.5, 1],
        [0.5, -0.5, 0.5],
      ],
      "360": [
        [0, -1, 1],
        [1, 0, 0.5],
      ],
    };
    let angle = msg.angle;
    console.log(angle)
    // console.log()
    tintNode.fills = [{
      type: 'GRADIENT_LINEAR', gradientTransform: DEFAULT_AFFINE_TRANSFORMS[angle], gradientStops: [
        { position: 0, color: { r: color1R, g: color1G, b: color1B, a: 1 } },
        { position: 1, color: { r: color2R, g: color2G, b: color2B, a: 1 } }
      ]
    }]
    node.push(tintNode);
    //test code 
    // let ellipseNode = figma.createEllipse();

    // ellipseNode.fills = [{
    //   type: 'GRADIENT_LINEAR', gradientTransform: DEFAULT_AFFINE_TRANSFORMS[angle], gradientStops: [
    //     { position: 0, color: { r: color1R, g: color1G, b: color1B, a: 1 } },
    //     { position: 1, color: { r: color2R, g: color2G, b: color2B, a: 1 } }
    //   ]
    // }]
    // // Create a new Rectangle node with a Grain effect
    // let grainNode = figma.createRectangle();
    // // Set the image source for the image fill
    // let imageSource = figma.createImage(
    //   {
    //     "url": "https://www.shutterstock.com/image-photo/red-apple-isolated-on-white-background-1727544364"
    //   }
    // );
    // // Create an image fill for the Rectangle node
    // grainNode.fills = [{
    //   type: 'IMAGE',
    //   scaleMode: 'FILL',
    //   imageHash: imageSource.hash
    // }];
    // // Group the Ellipse and Grain nodes together
    // let groupNode = figma.group([ellipseNode, grainNode], figma.currentPage);

    // // Move and resize the Grain node to overlay the Ellipse node
    // grainNode.x = ellipseNode.x;
    // grainNode.y = ellipseNode.y;
    // grainNode.resizeWithoutConstraints(ellipseNode.width, ellipseNode.height);
    // figma.viewport.scrollAndZoomIntoView(node);
    // //end of test code
    //toast 
    figma.notify("✅ Gradient Added");
    figma.viewport.scrollAndZoomIntoView(node);
    figma.currentPage.selection = node;
  }

  if (msg.type === 'cancel') {

    figma.closePlugin();
  }
  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
};
