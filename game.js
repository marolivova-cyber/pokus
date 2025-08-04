// Nastavenie scény a kamery (rovnaké ako predtým)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Pridanie svetla
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Vytvorenie roviny ako cesty
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

camera.position.z = 10;
camera.position.y = 2;

let car = null; // Vytvoríme prázdnu premennú pre auto

const loader = new THREE.GLTFLoader();

// Načítanie tvojho modelu z priečinka 'moja hra'
loader.load(
    'auto.glb', //  <-- TU je správna cesta k tvojmu modelu!
    function (gltf) {
        car = gltf.scene;
        car.position.set(0, 0, 5);
        // Pridaj model do scény
        scene.add(car);
        // Kamera sa pozerá na načítané auto
        camera.lookAt(car.position); 
        console.log('Model auta bol úspešne načítaný!');
    },
    // Funkcia na sledovanie priebehu načítania (voliteľné)
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% načítané');
    },
    // Funkcia na obsluhu chýb (voliteľné)
    function (error) {
        console.log('Nastala chyba pri načítaní modelu:', error);
    }
);

// Nastavenie ovládania (rovnaké ako predtým)
let moveLeft = false;
let moveRight = false;

document.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
        moveLeft = true;
    } else if (event.key === 'd') {
        moveRight = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'a') {
        moveLeft = false;
    } else if (event.key === 'd') {
        moveRight = false;
    }
});

function animate() {
    requestAnimationFrame(animate);

    // Kód na pohyb sa vykoná iba ak je auto načítané
    if (car) {
        if (moveLeft) {
            car.position.x -= 0.05;
        }
        if (moveRight) {
            car.position.x += 0.05;
        }
    }

    renderer.render(scene, camera);
}

animate();

// Responzivita (rovnaké ako predtým)
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);