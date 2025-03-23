import { useState } from 'react';
import SearchBar from './components/searchBar';
import { searchParts } from './api/searchParts';

function App() {
  const [results, setResults] = useState<any[]>([]);
  const handleSearch = async (query: string, category: string) => {
    try {
      const res = await searchParts(query, category);
      console.log('API Response: ', res);
      setResults(res.data);
    
    } 
    catch (err) {
      console.error('Search failed:', err);
    }
  };
  

  const renderSpecs = (item: any, category: string) => {
    switch (category) {
      case 'PCCase':
        return (
          <>
            <p>Price: ${item.price}</p>
            <p>Dimensions: {item.dimensions}</p>
            <p>Volume: {item.volume}</p>
            <p>Form Factor: {item.form_factor}</p>
            <p>Side Panel: {item.side_panel}</p>
            <p>Power Supply: {item.power_supply}</p>
            <p>Max GPU Length: {item.max_gpu_length}</p>
            <p>Max GPU Cooler: {item.max_gpu_cooler}</p>
            <p>3.5" Bays: {item.bays_3_5}</p>
            <p>2.5" Bays: {item.bays_2_5}</p>
            <p>Expansion Slots: {item.expansion_slots}</p>
            <p>Additional Info: <br />{item.additional_info}</p>
          </>
        );
      case 'CPU':
        return (
          <>
            <p>Series: {item.series}</p>
            <p>Microarchitecture: {item.microarchitecture}</p>
            <p>Core Family: {item.core_family}</p>
            <p>Socket: {item.socket}</p>
            <p>Total Cores: {item.total_cores}</p>
            <p>P-Cores: {item.p_cores}</p>
            <p>E-Cores: {item.e_cores}</p>
            <p>Threads: {item.threads}</p>
            <p>Base Clock: {item.base_clock}</p>
            <p>Boost Clock: {item.boost_clock}</p>
            <p>Cache L3: {item.cache_l3}</p>
            <p>TDP: {item.tdp}</p>
            <p>Integrated Graphics: {item.integrated_graphics}</p>
          </>
        );
      case 'Motherboard':
        return (
          <>
            <p>Socket: {item.socket}</p>
            <p>Form Factor: {item.form_factor}</p>
            <p>Chipset: {item.chipset}</p>
            <p>Memory Type: {item.memory_type}</p>
            <p>Memory Slots: {item.memory_slots}</p>
            <p>Max Memory: {item.max_memory}</p>
            <p>SATA 6Gb/s: {item.sata_6}</p>
            <p>SATA 3Gb/s: {item.sata_3}</p>
            <p>U.2 Ports: {item.u2_ports}</p>
            <p>PCIe Slots: {item.pcie_slots}</p>
            <p>M.2 Slots: {item.m2_slots}</p>
            <p>2.5G LAN: {item.lan_2_5g}</p>
            <p>USB 2.0: {item.usb_2_0}</p>
            <p>USB 3.2 Gen 1: {item.usb_3_2_gen1}</p>
            <p>USB 3.2 Gen 2: {item.usb_3_2_gen2}</p>
            <p>USB 3.2 Gen 2x2: {item.usb_3_2_gen2x2}</p>
            <p>USB 4.0: {item.usb_4_0}</p>
            <p>ECC Support: {item.ecc_support}</p>
            <p>RAID Support: {item.raid_support}</p>
            <p>BIOS Flashback: {item.bios_flashback}</p>
            <p>Clear CMOS Button: {item.clear_cmos}</p>
            <p>Audio Chipset: {item.audio_chipset}</p>
            <p>Audio Channels: {item.audio_channels}</p>
            <p>Back Panel Ports: {item.back_panel_ports}</p>
            <p>Additional Info: <br />{item.additional_info}</p>
          </>
        );
      case 'GPU':
        return (
          <>
            <p>Chipset: {item.chipset}</p>
            <p>Memory: {item.memory}</p>
            <p>Memory Type: {item.memory_type}</p>
            <p>Core Base Clock: {item.core_base_clock}</p>
            <p>Core Boost Clock: {item.core_boost_clock}</p>
            <p>Memory Clock: {item.memory_clock}</p>
            <p>Memory Bus: {item.memory_bus}</p>
            <p>Interface: {item.interface}</p>
            <p>Length: {item.length}</p>
            <p>TDP: {item.tdp}</p>
            <p>HDMI 2.1: {item.hdmi_2_1}</p>
            <p>DisplayPort 2.1: {item.displayport_2_1}</p>
            <p>Additional Info: <br />{item.additional_info}</p>
          </>
        );
      case 'RAM':
        return (
          <>
            <p>Speed: {item.speed}</p>
            <p>Type: {item.type}</p>
            <p>Form Factor: {item.form_factor}</p>
            <p>Capacity: {item.capacity}</p>
            <p>Modules: {item.modules}</p>
            <p>Per Module: {item.per_module}</p>
            <p>CAS Latency: {item.cas_latency}</p>
            <p>Timings: {item.timings}</p>
            <p>Voltage: {item.voltage}</p>
            <p>Heat Spreader: {item.heat_spreader}</p>
            <p>RGB: {item.rgb}</p>
            <p>Height: {item.height}</p>
          </>
        );
      case 'CPUCooler':
        return (
          <>
            <p>Noise: {item.noise}</p>
            <p>Fan RPM: {item.fan_rpm}</p>
            <p>Cooling: {item.cooling}</p>
            <p>Additional Info: <br />{item.additional_info}</p>
          </>
        );
      case 'Storage':
        return (
          <>
            <p>Capacity: {item.capacity}</p>
            <p>Type: {item.type}</p>
            <p>Form Factor: {item.form_factor}</p>
            <p>Interface: {item.interface}</p>
            <p>NVMe: {item.nvme}</p>
            <p>Series: {item.series}</p>
            <p>Manufacturer: {item.manufacturer}</p>
            <p>Additional Info: <br />{item.additional_info}</p>
          </>
        );
      case 'PowerSupply':
        return (
          <>
            <p>Wattage: {item.wattage}</p>
            <p>Form Factor: {item.form_factor}</p>
            <p>Efficiency: {item.efficiency}</p>
            <p>Modularity: {item.modularity}</p>
            <p>Length: {item.length}</p>
            <p>Fanless: {item.fanless}</p>
            <p>ATX 24-pin: {item.atx_24_pin}</p>
            <p>EPS 8-pin: {item.eps_8_pin}</p>
            <p>PCIe 12VHPWR: {item.pcie_12vhpwr}</p>
            <p>PCIe 6+2-pin: {item.pcie_6_2_pin}</p>
            <p>SATA: {item.sata}</p>
            <p>Molex: {item.molex}</p>
            <p>Additional Info: <br />{item.additional_info}</p>
          </>
        );
      case 'CaseFan':
        return (
          <>
            <p>Size: {item.size}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Min Airflow: {item.min_airflow}</p>
            <p>Max Airflow: {item.max_airflow}</p>
            <p>Min Noise: {item.min_noise}</p>
            <p>Max Noise: {item.max_noise}</p>
            <p>PWM: {item.pwm}</p>
            <p>LED: {item.led}</p>
            <p>Static Pressure: {item.static_pressure}</p>
            <p>Controller: {item.controller}</p>
            <p>Connector: {item.connector}</p>
          </>
        );
      default:
        return <p>No specs available for this category.</p>;
      }
    };
  

  return (
    <div>
      <h1 className="text-xl font-bold p-4">Buildcores Compare</h1>
      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-2 gap-4 p-4">
        {results.map((item, idx) => (
          <div key={idx} className="border p-2 rounded shadow">
            <h2>{item.name}</h2>
            {renderSpecs(item, item.part_category || 'PCCase')}
            <button className="mt-2 px-3 py-1 bg-green-500 text-white rounded">
              Add to Compare
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;