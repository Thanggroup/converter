document.getElementById('coordinateForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);

    // Define projections
    const wgs84 = '+proj=longlat +datum=WGS84 +no_defs';
    const vn2000 = '+proj=tmerc +lat_0=0 +lon_0=108.25 +k=0.9999 +x_0=500000 +y_0=0 +ellps=WGS84 +towgs84=-191.90441429,-39.30318279,-111.45032835,-0.00928836,0.01975479,-0.00427372,0.252906278';

    // Transform coordinates
    const transformed = proj4(wgs84, vn2000, [longitude, latitude]);

    // Display result
    document.getElementById('result').innerText = `x/hướng đông: ${transformed[0].toFixed(2)}, y/hướng bắc: ${transformed[1].toFixed(2)}`;
	
});
document.getElementById('coordinateForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get latitude and longitude from input fields
    const lat = parseFloat(document.getElementById('latitude').value);
    const lng = parseFloat(document.getElementById('longitude').value);

    // Initialize the map
    const map = L.map('map').setView([lat, lng], 13); // Set view to user coordinates

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Add a marker at the specified coordinates
    L.marker([lat, lng]).addTo(map)
        .bindPopup(`Location: ${lat}, ${lng}`)
        .openPopup();
});