// Globálne premenné pre scénu, kameru, render, auto a ovládanie
let scene, camera, renderer, car;
let carSpeed = 0.05; // Rýchlosť pohybu auta
let moveLeft = false;
let moveRight = false;

// Inicializačná funkcia, ktorá sa spustí pri načítaní stránky
function init() {
    // 1. Nastavenie scény
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Farba pozadia (modrá obloha)

    // 2. Nastavenie kamery
    // PerspectiveCamera(uhol pohľadu, pomer strán, blízky klip, vzdialený klip)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10); // Pozícia kamery (x, y, z)
    camera.lookAt(0, 0, 0); // Kamera sa pozerá na stred scény

    // 3. Nastavenie renderera
    renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias pre hladšie hrany
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement); // Pridanie plátna (canvas) do tela HTML

    // 4. Pridanie svetla
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Rovnomerné svetlo
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Smerové svetlo (ako slnko)
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // 5. Načítanie 3D modelu auta (auto.glb)
    const loader = new THREE.GLTFLoader();
    loader.load(
        'auto.glb', // Cesta k tvojmu modelu
        function (gltf) {
            car = gltf.scene;
            
            // --- MOŽNÉ ÚPRAVY, AK AUTO NIE JE VIDITEĽNÉ ---
            // Skús zmeniť mierku, ak je auto príliš malé alebo veľké
            // car.scale.set(0.5, 0.5, 0.5); // Príklad zmenšenia
            // car.scale.set(2, 2, 2); // Príklad zväčšenia
            
            // Skús zmeniť pozíciu, ak je auto mimo zorného poľa kamery
            car.position.y = 0; // Umiestnenie na zem
            
            // Skús otočiť model, ak je obrátený nesprávnym smerom
            // car.rotation.y = Math.PI; // Otočenie o 180 stupňov
            
            scene.add(car); // Pridanie auta do scény
            console.log("Auto bolo úspešne načítané a pridané do scény.");
        },
        // Funkcia na sledovanie priebehu načítania
        undefined, 
        // Funkcia, ktorá sa zavolá v prípade chyby
        function (error) {
            console.error('Došlo k chybe pri načítaní modelu auta:', error);
        }
    );

    // 6. Pridanie poslucháčov udalostí pre klávesy a zmenu veľkosti okna
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    window.addEventListener('resize', onWindowResize, false);

    // 7. Spustenie animácie
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

    // Pohyb auta
    if (car) { // Kontrola, či je auto načítané
        if (moveLeft) {
            car.position.x -= carSpeed;
        }
        if (moveRight) {
            car.position.x += carSpeed;
        }
    }

    // Renderovanie scény
    renderer.render(scene, camera);
}

// Spustenie inicializačnej funkcie po načítaní skriptu
init();
