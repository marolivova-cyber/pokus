document.addEventListener('DOMContentLoaded', (event) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add more lights to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // increased intensity
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    const loader = new THREE.GLTFLoader();
    let car;

    loader.load(
        'auto.glb',
        (gltf) => {
            car = gltf.scene;
            scene.add(car);
            car.position.set(0, 0, 0);
            console.log('Model loaded successfully');
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('An error happened during loading:', error);
        }
    );

    camera.position.z = 5;

    const moveDistance = 0.1;
    document.addEventListener('keydown', (e) => {
        if (!car) {
            console.log('Car model not loaded yet');
            return;
        }

        switch (e.key) {
            case 'ArrowLeft':
                car.position.x -= moveDistance;
                break;
            case 'ArrowRight':
                car.position.x += moveDistance;
                break;
        }
    });

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
});
