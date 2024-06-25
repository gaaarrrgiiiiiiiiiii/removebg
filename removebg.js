function clickMe(){
  document.getElementById("click").click();
}
const imageInput = document.getElementById('click');
const result = document.getElementById('result');

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  const formData = new FormData();
  formData.append('image_file', file);
  formData.append('size', 'auto');

  fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': 'UmGTjNKYxvJeawTdqb9CnUfA'
    },
    body: formData
  })
  .then(response => response.blob())
  .then(blob => {
    // const Url = URL.createObjectURL(blob);
    // downloadImage(Url);
    const imageUrl = URL.createObjectURL(blob);
    result.style.backgroundImage = `url(${imageUrl})`;
    


    const downloadButton = document.getElementsByClassName('download');
    downloadButton.onclick = function (){
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = 'no-bg.png';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(imageUrl);
    document.body.removeChild(a);
    }
});
    
  })
  .catch(error => {
    console.error(error);
  });

    

    // result.style.backgroundImage = `url(${Url})`;
    // const img = document.createElement("img");
    // img.src = Url;
    

  

function hideButton(){
  document.getElementById("upload").style.display="none";
  
  
}
function popButton(){
  document.getElementById("mg").style.display="block";

}

function popSta(){
  document.getElementById("brushTool").style.display="block";
  document.getElementById("brushSizeRange").style.display="block";
}

// function downloadFile(){
//   const resultImage = document.getElementById("result");
//   resultImage.src = image_url;
//   const downloadLink = document.getElementById("download-link");
//   downloadLink.href = image_url;

// }
// 
// const downloadButton = document.getElementsByClassName('download');
//           downloadButton.style.display = 'inline-block';

//           downloadButton.onclick = function() {
//               const a = document.createElement('a');
//               a.href = url;
//               a.download = 'no-bg.png';
//               document.body.appendChild(a);
//               a.click();
//               window.URL.revokeObjectURL(url);
//               document.body.removeChild(a);
// };









//magicbrush




 
const canvas = new fabric.Canvas('canvas');
const imageLoader = document.getElementById('upload');
const brushToolBtn = document.getElementById('brushTool');
const brushSizeRange = document.getElementById('brushSizeRange');
let imgInstance;

imageLoader.addEventListener('change', handleImage, false);
brushToolBtn.addEventListener('click', toggleBrushMode, false);
brushSizeRange.addEventListener('input', updateBrushSize, false);

function handleImage(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        fabric.Image.fromURL(event.target.result, function(img) {
            canvas.clear();
            imgInstance = img.set({ selectable: false });
            canvas.setWidth(img.width);
            canvas.setHeight(img.height);
            canvas.add(imgInstance);
        });
    }
    reader.readAsDataURL(e.target.files[0]);
}

let isBrushMode = false;
function toggleBrushMode() {
    isBrushMode = !isBrushMode;
    canvas.isDrawingMode = isBrushMode;
    brushSizeRange.disabled = !isBrushMode;
    canvas.forEachObject(obj => {
        obj.selectable = !isBrushMode;
    });
    if (isBrushMode) {
        const eraser = new fabric.PencilBrush(canvas);
        eraser.color = 'rgba(0,0,0,1)'; // Use black color for erasing
        eraser.width = parseInt(brushSizeRange.value);
        canvas.freeDrawingBrush = eraser;
        canvas.on('path:created', (opt) => {
            const path = opt.path;
            path.globalCompositeOperation = 'destination-out';
            canvas.add(path);
            canvas.renderAll();
        });
    } else {
        canvas.off('path:created');
    }
}

function updateBrushSize() {
    const newSize = parseInt(brushSizeRange.value);
    if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.width = newSize;
    }
}




// const canvas = new fabric.Canvas('result', {isDrawingMode: false});

// canvas.setBackgroundImage('imageUrl', canvas.renderAll.bind(canvas));

// canvas.freeDrawingBrush.color = 'green';
// canvas.freeDrawingBrush.width = 50;

// const editBtn = document.getElementById("mg");

// editBtn.addEventListener('click', function () {
//     canvas.isDrawingMode = !canvas.isDrawingMode;
// });



// document.getElementById('remove').addEventListener('click', function () {
//     canvas.isDrawingMode = false;
//     canvas.remove(canvas.getActiveObject());
// });


// canvas.on('selection:created', function () {
//   document.getElementById('remove').removeAttribute('disabled');
// });


// canvas.on('selection:cleared', function () {
//   document.getElementById('remove').setAttribute('disabled', 'disabled');
// });


// document.getElementById('api').addEventListener('click', function () {
//     const imageData = canvas.toDataURL({
//         format: 'png',
//         quality: 1
//     });
//     removeBgFromImage(imageData);
//   })
    


// // REMOVE BG API
// function removeBgFromImage(imageData) {
//     const apiKey = 'UmGTjNKYxvJeawTdqb9CnUfA'; 
//     const base64Data = imageData.split(',')[1];

    

//     fetch('https://api.remove.bg/v1.0/removebg', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Api-Key': 'UmGTjNKYxvJeawTdqb9CnUfA'
//         },
//         body: JSON.stringify({
//           image_file_b64: base64Data
//         })
//       })
//       .then(response => response.blob())
//       .then(blob => {
//         // Handle the response blob (e.g., create an image element and set the src)
//         const imageUrl = URL.createObjectURL(blob);
//         const img = new Image();
//         img.src = imageUrl;
//         document.body.appendChild(img);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//     }
