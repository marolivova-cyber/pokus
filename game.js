// Globálne premenné pre scénu, kameru, render, auto, kružnicu a ovládanie
let scene, camera, renderer, car, circle;
let carSpeed = 0.05; // Rýchlosť pohybu auta
let moveLeft = false;
let moveRight = false;

// Inicializačná funkcia, ktorá sa spustí pri načítaní stránky
function init() {
    // 1. Nastavenie scény
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Farba pozadia (modrá obloha)

    // 2. Nastavenie kamery
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10); // Pozícia kamery (x, y, z)
    camera.lookAt(0, 0, 0); // Kamera sa pozerá na stred scény

    // 3. Nastavenie renderera
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 4. Pridanie svetla
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    
    // 5. Vytvorenie a pridanie kružnice (vizuálny indikátor)
    const circleGeometry = new THREE.CircleGeometry(2, 32); // Polomer 2, 32 segmentov
    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0x66ff66, side: THREE.DoubleSide }); // Svetlozelená farba
    circle = new THREE.Mesh(circleGeometry, circleMaterial);
    circle.rotation.x = -Math.PI / 2; // Otočenie, aby bola horizontálna
    circle.position.y = 0; // Umiestnenie na zem
    scene.add(circle);

    // 6. Načítanie 3D modelu auta (auto.glb)
    const loader = new THREE.GLTFLoader();
    loader.load(
        'auto.glb',
        function (gltf) {
            car = gltf.scene;
            
            // Auto umiestnime do stredu kružnice
            car.position.set(0, 0, 0);
            
            // Ak je auto príliš malé/veľké, odkomentuj a uprav mierku
            // car.scale.set(0.5, 0.5, 0.5);
            // car.scale.set(2, 2, 2);
            
            // Ak je auto zle orientované, odkomentuj a uprav rotáciu
            // car.rotation.y = Math.PI;
            
            // Dôležité: Pridaj auto ako dieťa kružnice.
            // Bude sa hýbať spolu s ňou.
            circle.add(car);
            console.log("Auto bolo úspešne načítané a pridané ako dieťa kružnice.");
        },
        undefined,
        function (error) {
            console.error('Došlo k chybe pri načítaní modelu auta:', error);
        }
    );

    // 7. Pridanie poslucháčov udalostí pre klávesy a zmenu veľkosti okna
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    window.addEventListener('resize', onWindowResize, false);

    // 8. Spustenie animácie
    animate();
}

// Funkcia, ktorá spracuje stlačenie klávesy
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

// Funkcia, ktorá spracuje pustenie klávesy
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

// Funkcia, ktorá sa zavolá pri zmene veľkosti okna
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Hlavná animačná slučka
function animate() {
    requestAnimationFrame(animate);

    // Pohyb kružnice (a tým aj auta)
    if (circle) {
        if (moveLeft) {
            circle.position.x -= carSpeed;
        }
        if (moveRight) {
            circle.position.x += carSpeed;
        }
    }

    // Renderovanie scény
    renderer.render(scene, camera);
}

// Spustenie inicializačnej funkcie po načítaní skriptu
init();
