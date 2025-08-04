let scene, camera, renderer, car;
let carSpeed = 0.05; // Rýchlosť pohybu auta
let moveLeft = false;
let moveRight = false;

function init() {
    // 1. Nastavenie scény
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Modrá obloha

    // 2. Nastavenie kamery
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // 3. Nastavenie renderera
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 4. Pridanie svetla
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // 5. Načítanie modelu auta (auto.glb)
    const loader = new THREE.GLTFLoader();
    loader.load(
        'auto.glb',
        function (gltf) {
            car = gltf.scene;
            car.position.y = 0; // Nastavenie pozície na zem
            scene.add(car);
        },
        undefined,
        function (error) {
            console.error('An error happened while loading the car model:', error);
        }
    );

    // 6. Spracovanie stlačenia kláves
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    // 7. Spracovanie zmeny veľkosti okna
    window.addEventListener('resize', onWindowResize, false);

    // 8. Spustenie animácie
    animate();
}

function onKeyDown(event) {
    switch (event.key) {
        case 'ArrowLeft':
            moveLeft = true;
            break;
        case 'ArrowRight':
            moveRight = true;
            break;
    }
}

function onKeyUp(event) {
    switch (event.key) {
        case 'ArrowLeft':
            moveLeft = false;
            break;
        case 'ArrowRight':
            moveRight = false;
            break;
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Pohyb auta na základe stlačených kláves
    if (car) {
        if (moveLeft) {
            car.position.x -= carSpeed;
        }
        if (moveRight) {
            car.position.x += carSpeed;
        }
    }

    renderer.render(scene, camera);
}

// Spustenie hry
init();
