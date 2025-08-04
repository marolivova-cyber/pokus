document.addEventListener('DOMContentLoaded', () => {
    // Inicializácia scény, kamery a rendereru
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 2, 5);

    //const renderer = new THREE.WebGLRenderer({ antialias: true });
    //renderer.setSize(window.innerWidth, window.innerHeight);
	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setClearColor(0x000000, 0); // čierna farba, 0 = plná priehľadnosť
    document.body.appendChild(renderer.domElement);

    // Svetlo – kombinácia ambientného a directionálneho + hemisphere
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 5, 5);
    scene.add(directionalLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    scene.add(hemiLight);

    // GLTFLoader – načítanie modelu auta
    const loader = new THREE.GLTFLoader();
    let car;

    loader.load(
        'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Cube/glTF/Cube.gltf',
        (gltf) => {
            car = gltf.scene;
            car.position.set(0, 0, 0);
            scene.add(car);

            // Kamera sa pozerá na auto
            camera.lookAt(car.position);

            console.log('Model loaded successfully');
        },
        (xhr) => {
            const percent = (xhr.loaded / xhr.total * 100).toFixed(2);
            console.log(`${percent}% loaded`);
        },
        (error) => {
            console.error('Error while loading model:', error);
        }
    );

    // Ovládanie pomocou kláves
    const moveDistance = 0.1;
    document.addEventListener('keydown', (e) => {
        if (!car) return;

        switch (e.key) {
            case 'ArrowLeft':
                car.position.x -= moveDistance;
                break;
            case 'ArrowRight':
                car.position.x += moveDistance;
                break;
        }

        camera.lookAt(car.position); // kamera sleduje pohyb auta
    });

    // Animácia scény
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
});
