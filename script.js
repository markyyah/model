// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);

// Wait for page to load then add hotspot listeners
window.addEventListener('DOMContentLoaded', () => {
  const modelViewer = document.querySelector('model-viewer');
  
  modelViewer.addEventListener('load', () => {
    console.log('Model loaded successfully');
    // Set initial camera position to match default
    modelViewer.cameraOrbit = '-0.8355192608086832rad 0.9153384632743027rad 1195.1577537734665m';
    modelViewer.cameraTarget = '-41.99543672808999m -6.491963504212178m -83.71453391574049m';
    
    // AR debugging
    modelViewer.addEventListener('ar-status', (event) => {
      console.log('AR Status:', event.detail.status);
      if (event.detail.status === 'failed') {
        console.error('AR failed to start');
      }
    });
    
    const hotspots = document.querySelectorAll('.Hotspot');
    
    hotspots.forEach((hotspot) => {
      hotspot.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Hide all other hotspots
        hotspots.forEach(h => {
          if (h !== hotspot) {
            h.style.display = 'none';
          }
        });
        
        // Show reset button
        document.getElementById('reset-btn').style.display = 'block';
        
        // Set camera based on hotspot
        const annotation = hotspot.querySelector('.HotspotAnnotation').textContent;
        if (annotation === 'Air Inlet') {
          modelViewer.cameraOrbit = '-0.9017077946751814rad 0.883203437130421rad 200m';
          modelViewer.cameraTarget = '-153.13822211444474m 87.32114407908442m 21.00240563119042m';
        } else if (annotation === 'Compressor Section') {
          modelViewer.cameraOrbit = '0.014149567809939756rad 0.7948310042929382rad 180m';
          modelViewer.cameraTarget = '-69.36215243548781m 77.33418770823934m 18.401294434647525m';
        } else if (annotation === 'Exhaust Section') {
          modelViewer.cameraOrbit = '0.873770289768226rad 1.0471975511965974rad 180m';
          modelViewer.cameraTarget = '128.96694959416652m 68.8182694953388m 4.992554801089831m';
        } else if (annotation === 'Turbine Section') {
          modelViewer.cameraOrbit = '0.3435369186101522rad 1.2078745207162394rad 180m';
          modelViewer.cameraTarget = '68.83809860213256m 43.789097659881904m -88.23701098954027m';
        } else if (annotation === 'Engine cowling') {
          modelViewer.cameraOrbit = '0.6648905511827319rad 0.7820809422342366rad 600m';
          modelViewer.cameraTarget = '-44.73620479406173m 23.75669611014308m -225.32494098680178m';
        } else if (annotation === 'Combustion Section') {
          modelViewer.cameraOrbit = '1.58117380048767rad 0.000001rad 150m';
          modelViewer.cameraTarget = '2.8664267366364524m -6.492007368430741m 12.19003666363478m';
        }
      });
    });
    
    // Reset button functionality
    document.getElementById('reset-btn').addEventListener('click', () => {
      // Show all hotspots
      hotspots.forEach(h => {
        h.style.display = 'block';
      });
      
      // Hide reset button
      document.getElementById('reset-btn').style.display = 'none';
      
      // Reset camera to default position
      modelViewer.cameraOrbit = '-0.8355192608086832rad 0.9153384632743027rad 1195.1577537734665m';
      modelViewer.cameraTarget = '-41.99543672808999m -6.491963504212178m -83.71453391574049m';
    });
    

    
    // Dropdown hotspot navigation
    document.getElementById('hotspot-dropdown').addEventListener('change', (e) => {
      const selectedHotspot = e.target.value;
      console.log(`Selected: ${selectedHotspot}`);
      
      // Hide all hotspots first
      hotspots.forEach(h => h.style.display = 'none');
      
      if (selectedHotspot === 'Air Inlet') {
        modelViewer.cameraOrbit = '-0.9017077946751814rad 0.883203437130421rad 200m';
        modelViewer.cameraTarget = '-153.13822211444474m 87.32114407908442m 21.00240563119042m';
        // Show only Air Inlet hotspot
        hotspots.forEach(h => {
          if (h.querySelector('.HotspotAnnotation').textContent === 'Air Inlet') {
            h.style.display = 'block';
          }
        });
      } else if (selectedHotspot === 'Compressor Section') {
        modelViewer.cameraOrbit = '0.014149567809939756rad 0.7948310042929382rad 180m';
        modelViewer.cameraTarget = '-69.36215243548781m 77.33418770823934m 18.401294434647525m';
        hotspots.forEach(h => {
          if (h.querySelector('.HotspotAnnotation').textContent === 'Compressor Section') {
            h.style.display = 'block';
          }
        });
      } else if (selectedHotspot === 'Combustion Section') {
        modelViewer.cameraOrbit = '1.58117380048767rad 0.000001rad 150m';
        modelViewer.cameraTarget = '2.8664267366364524m -6.492007368430741m 12.19003666363478m';
        hotspots.forEach(h => {
          if (h.querySelector('.HotspotAnnotation').textContent === 'Combustion Section') {
            h.style.display = 'block';
          }
        });
      } else if (selectedHotspot === 'Turbine Section') {
        modelViewer.cameraOrbit = '0.3435369186101522rad 1.2078745207162394rad 180m';
        modelViewer.cameraTarget = '68.83809860213256m 43.789097659881904m -88.23701098954027m';
        hotspots.forEach(h => {
          if (h.querySelector('.HotspotAnnotation').textContent === 'Turbine Section') {
            h.style.display = 'block';
          }
        });
      } else if (selectedHotspot === 'Exhaust Section') {
        modelViewer.cameraOrbit = '0.873770289768226rad 1.0471975511965974rad 180m';
        modelViewer.cameraTarget = '128.96694959416652m 68.8182694953388m 4.992554801089831m';
        hotspots.forEach(h => {
          if (h.querySelector('.HotspotAnnotation').textContent === 'Exhaust Section') {
            h.style.display = 'block';
          }
        });
      } else if (selectedHotspot === 'Engine cowling') {
        modelViewer.cameraOrbit = '0.6648905511827319rad 0.7820809422342366rad 600m';
        modelViewer.cameraTarget = '-44.73620479406173m 23.75669611014308m -225.32494098680178m';
        hotspots.forEach(h => {
          if (h.querySelector('.HotspotAnnotation').textContent === 'Engine cowling') {
            h.style.display = 'block';
          }
        });
      } else if (selectedHotspot === '') {
        modelViewer.cameraOrbit = '-0.8355192608086832rad 0.9153384632743027rad 1195.1577537734665m';
        modelViewer.cameraTarget = '-41.99543672808999m -6.491963504212178m -83.71453391574049m';
        // Show all hotspots when default is selected
        hotspots.forEach(h => h.style.display = 'block');
      }
      
      // Show description panel
      const descriptionPanel = document.getElementById('description-panel');
      const descriptionTitle = document.getElementById('description-title');
      const descriptionContent = document.getElementById('description-content');
      
      if (selectedHotspot === 'Air Inlet') {
        descriptionTitle.textContent = 'Air Inlet';
        descriptionContent.innerHTML = `
          <p>The air inlet must get air to the compressor with the least possible fuss, meaning it should cause very little drag or pressure loss.</p>
          <p><strong>Goal:</strong> The air flow entering the compressor needs to be smooth and free of turbulence (rough, choppy flow).</p>
          <p><strong>Result:</strong> A good design ensures maximum operating efficiency and helps boost the final pressure the compressor can create. Basically, a well-designed inlet helps the engine work better and makes the aircraft perform better.</p>
        `;
        descriptionPanel.style.display = 'block';
      } else if (selectedHotspot === 'Compressor Section') {
        descriptionTitle.textContent = 'Compressor Section';
        descriptionContent.innerHTML = `
          <p>The main job of the compressor in a gas turbine engine is to supply enough high-pressure air to the combustion burners.</p>
          <p><strong>Goal:</strong> The compressor must take the large mass of air from the inlet and increase its pressure significantly.</p>
          <p><strong>Result:</strong> It then discharges this air to the burners in the exact quantity and at the necessary pressure required for the fuel to burn efficiently and powerfully.</p>
        `;
        descriptionPanel.style.display = 'block';
      } else if (selectedHotspot === 'Combustion Section') {
        descriptionTitle.textContent = 'Combustion Section';
        descriptionContent.innerHTML = `
          <p>The combustion section is where fuel is burned to make the air hotter.</p>
          <p><strong>Goal:</strong> The process of burning the air/fuel mixture releases energy (heat).</p>
          <p><strong>Result:</strong> The largest portion of this released energy is immediately used to spin the turbine blades, which in turn drives the compressor.</p>
        `;
        descriptionPanel.style.display = 'block';
      } else if (selectedHotspot === 'Turbine Section') {
        descriptionTitle.textContent = 'Turbine Section';
        descriptionContent.innerHTML = `
          <p>The turbine acts like a highly efficient windmill in the hot exhaust gas stream.</p>
          <p><strong>Goal:</strong> To capture the energy from the hot, high-pressure exhaust gases and turn it into mechanical energy (rotation).</p>
          <p><strong>Result:</strong> It uses about 60% to 70% of the gas pressure energy to drive the compressor (the part that feeds air into the engine) and all the engine's accessories.</p>
        `;
        descriptionPanel.style.display = 'block';
      } else if (selectedHotspot === 'Exhaust Section') {
        descriptionTitle.textContent = 'Exhaust Section';
        descriptionContent.innerHTML = `
          <p>The exhaust section is the final part of the engine where the gases exit.</p>
          <p><strong>Goal:</strong> To smooth out the flow of the hot gases, prevent turbulence, and direct them out the rear of the engine.</p>
          <p><strong>Result:</strong> It gives the exhaust gases a high final speed (velocity) as they exit the engine, which produces the thrust (forward push).</p>
        `;
        descriptionPanel.style.display = 'block';
      } else if (selectedHotspot === '') {
        descriptionPanel.style.display = 'none';
      } else {
        descriptionPanel.style.display = 'none';
      }
      
      // Debug log current camera position after animation
      setTimeout(() => {
        console.log(`Camera after ${selectedHotspot}:`, modelViewer.cameraOrbit);
      }, 500);
    });
    

  });
});