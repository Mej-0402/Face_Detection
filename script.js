//getting image element id - the image file
const imageUpload = document.getElementById('imageUpload')
//loading libraries from modal
Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(start)


function start(){
  const container = document.createElement('div')
  container.setAttribute("style", "border-radius: 50%;  ")
  container.style.position = 'relative'
  document.body.append(container)
  document.body.append('Loaded')

  imageUpload.addEventListener('change', async () => {
    //  if (image) image.remove()
    //  if (canvas) canvas.remove()
    const image = await faceapi.bufferToImage(imageUpload.files[0])
    image.setAttribute("style", "width:200px ;border-radius: 50%; border:  3px solid #083501 ")
    container.append(image)
    const canvas = faceapi.createCanvasFromMedia(image)
    container.append(canvas)
    const displaySize = { width: image.width, height: image.height }
    faceapi.matchDimensions(canvas, displaySize)
    const detections = await faceapi.detectAllFaces(image)
    .withFaceLandmarks().withFaceDescriptors()
    var s=0
    const resizedDetections = faceapi.resizeResults(detections,displaySize)
    resizedDetections.forEach(detection =>  {
    const box = detection.detection.box
    const drawBox = new faceapi.draw.DrawBox(box, {label:'Face Detected'})
    drawBox.draw(canvas)
    s++;
  

  })
  
    
  console.log( s)
  if(s==0)
  {
    document.write("no face detected")
  }
  else if( s == 1 ) {
    document.write(" face detected");
 }
else{ document.write(" multi face detected")}
   
 
    })

    
  }
  
 
   
    
  //   async function start() {
  // const container = document.createElement('div')
  // container.style.position = 'relative'
  // document.body.append(container)
  // const labeledFaceDescriptors = await loadLabeledImages()
  // const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
  // let image
  // let canvas
  // document.body.append('Loaded')
  // imageUpload.addEventListener('change', async () => {
  //   if (image) image.remove()
  //   if (canvas) canvas.remove()
  //   image = await faceapi.bufferToImage(imageUpload.files[0])
  //   container.append(image)
  //   canvas = faceapi.createCanvasFromMedia(image)
  //   container.append(canvas)
  //   const displaySize = { width: image.width, height: image.height }
  //   faceapi.matchDimensions(canvas, displaySize)
  //   const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
  //   const resizedDetections = faceapi.resizeResults(detections, displaySize)
  //   const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
  //   results.forEach((result, i) => {
  //     const box = resizedDetections[i].detection.box
  //     const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
  //     drawBox.draw(canvas)
  //   })
  //       })
  //     }
 

// function loadLabeledImages() {
//   const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark']
//   return Promise.all(
//     labels.map(async label => {
//       const descriptions = []
//       for (let i = 1; i <= 2; i++) {
//         const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/${label}/${i}.jpg`)
//         const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
//         descriptions.push(detections.descriptor)
//       }

      // return new faceapi.LabeledFaceDescriptors(label, descriptions)
   