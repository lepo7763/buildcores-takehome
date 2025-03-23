import { useState } from 'react';
import SearchBar from './components/searchBar';
import { searchParts } from './api/searchParts';
import './App.css';

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
  
  const renderField = (label: string, value: any) => {
    let displayValue = value;
    if (typeof value === 'boolean') {
      displayValue = value ? 'Yes' : 'No';
    } else if (value === null || value === undefined || value === '') {
      displayValue = 'N/A';
    }
  
    return (
      <div className="flex">
        <span className="w-32 font-semibold">{label}:</span>
        <span>{displayValue}</span>
      </div>
    );
  };
  
  


  const renderSpecs = (item: any, category: string) => {
    const f = item.v2Fields || {};
    const meta = f.metadata || {};
  
    switch (category) {
      case 'PCCase':
        return (
          <>
            {renderField('Form Factor', f.form_factor)}
            {renderField('Side Panel', f.side_panel)}
            {renderField('Power Supply', f.power_supply)}
            {renderField('Max GPU Length', f.max_video_card_length + ' mm')}
            {renderField('Max CPU Cooler Height', f.max_cpu_cooler_height)}
            {renderField('3.5" Bays', f.internal_3_5_bays)}
            {renderField('2.5" Bays', f.internal_2_5_bays)}
            {renderField('Expansion Slots', f.expansion_slots)}
            {renderField('Dimensions', f.dimensions)}
            {renderField('Volume', f.volume)}
            {renderField('Additional Info', item.additionalFeatures?.join('; '))}
          </>
        );
  
      case 'CPU':
        return (
          <>
            {renderField('Series', f.series || meta.series)}
            {renderField('Microarchitecture', item.microarchitecture)}
            {renderField('Core Family', item.coreFamily)}
            {renderField('Socket', item.socket)}
            {renderField('Total Cores', f.cores?.total)}
            {renderField('P-Cores', f.cores?.performance)}
            {renderField('Threads', f.cores?.threads)}
            {renderField('Base Clock', f.clocks?.performance?.base)}
            {renderField('Boost Clock', f.clocks?.performance?.boost)}
            {renderField('Cache L3', f.cache?.l3)}
            {renderField('TDP', f.specifications?.tdp)}
            {renderField('Integrated Graphics', f.specifications?.integratedGraphics?.model)}
            {renderField('Additional Info', item.additionalFeatures?.join('; '))}
          </>
        );
  
      case 'Motherboard':
        return (
          <>
            {renderField('Socket', item.socket)}
            {renderField('Form Factor', item.formFactor || f.form_factor)}
            {renderField('Chipset', item.chipset)}
            {renderField('Memory Type', f.memory?.ram_type)}
            {renderField('Memory Slots', f.memory?.slots)}
            {renderField('Max Memory', f.memory?.max)}
            {renderField('SATA 6Gb/s', f.storage_devices?.sata_6_gb_s)}
            {renderField('SATA 3Gb/s', f.storage_devices?.sata_3_gb_s)}
            {renderField('U.2 Ports', f.storage_devices?.u2)}
            {renderField('PCIe Slots', item.pcie_x16_slots)}
            {renderField('M.2 Slots', item.m2_slots)}
            {renderField('2.5G LAN', item.ethernet)}
            {renderField('USB 2.0', f.usb_headers?.usb_2_0)}
            {renderField('USB 3.2 Gen 1', f.usb_headers?.usb_3_2_gen_1)}
            {renderField('USB 3.2 Gen 2', f.usb_headers?.usb_3_2_gen_2)}
            {renderField('USB 3.2 Gen 2x2', f.usb_headers?.usb_3_2_gen_2x2)}
            {renderField('USB 4.0', f.usb_headers?.usb_4)}
            {renderField('ECC Support', f.ecc_support)}
            {renderField('RAID Support', f.raid_support)}
            {renderField('BIOS Flashback', f.bios_features?.flashback)}
            {renderField('Clear CMOS Button', f.bios_features?.clear_cmos)}
            {renderField('Audio Chipset', f.audio?.chipset)}
            {renderField('Audio Channels', f.audio?.channels)}
            {renderField('Back Panel Ports', f.back_panel_ports?.join(', '))}
            {renderField('Additional Info', item.additionalFeatures?.join('; '))}
          </>
        );
  
      case 'GPU':
        return (
          <>
            {renderField('Chipset', f.chipset)}
            {renderField('Memory', f.memory)}
            {renderField('Memory Type', f.memory_type)}
            {renderField('Base Clock', f.core_base_clock)}
            {renderField('Boost Clock', f.core_boost_clock)}
            {renderField('Memory Clock', f.effective_memory_clock)}
            {renderField('Memory Bus', f.memory_bus)}
            {renderField('Interface', f.interface)}
            {renderField('Length', f.length)}
            {renderField('TDP', f.tdp)}
            {renderField('HDMI 2.1', f.video_outputs?.hdmi_2_1)}
            {renderField('DisplayPort 2.1', f.video_outputs?.displayport_2_1)}
            {renderField('Cooling', f.cooling)}
            {renderField('Additional Info', item.additionalFeatures?.join('; '))}
          </>
        );
  
      case 'RAM':
        return (
          <>
            {renderField('Speed', f.speed)}
            {renderField('Type', f.ram_type)}
            {renderField('Form Factor', f.form_factor)}
            {renderField('Capacity', f.capacity)}
            {renderField('Modules', f.modules?.quantity)}
            {renderField('Per Module', f.modules?.capacity_gb)}
            {renderField('CAS Latency', f.cas_latency)}
            {renderField('Timings', f.timings)}
            {renderField('Voltage', f.voltage)}
            {renderField('Heat Spreader', f.heat_spreader)}
            {renderField('RGB', f.rgb)}
            {renderField('Additional Info', item.additionalFeatures?.join('; '))}
          </>
        );
  
      case 'CPUCooler':
        return (
          <>
            {renderField('Noise', item.noiseLevel)}
            {renderField('Fan RPM', item.fanRPM)}
            {renderField('Water Cooled', item.waterCooled)}
            {renderField('Air Cooled', item.airCooled)}
            {renderField('Additional Info', item.additionalFeatures?.join('; '))}
          </>
        );
  
      case 'Storage':
        return (
          <>
            {renderField('Capacity', f.capacity)}
            {renderField('Type', f.type)}
            {renderField('Form Factor', f.form_factor)}
            {renderField('Interface', f.interface)}
            {renderField('NVMe', f.nvme)}
            {renderField('Additional Info', item.additionalFeatures?.join('; '))}
          </>
        );
  
      case 'PSU':
        return (
          <>
            {renderField('Wattage', f.wattage)}
            {renderField('Form Factor', f.form_factor)}
            {renderField('Efficiency Rating', f.efficiency_rating)}
            {renderField('Modularity', f.modular)}
            {renderField('Length (mm)', f.length)}
            {renderField('Fanless', f.fanless)}
            {renderField('Color', f.color)}
  
            {/* Connector fields */}
            {renderField('ATX 24-pin', f.connectors?.atx_24_pin)}
            {renderField('EPS 8-pin', f.connectors?.eps_8_pin)}
            {renderField('PCIe 12VHPWR', f.connectors?.pcie_12vhpwr)}
            {renderField('PCIe 6+2-pin', f.connectors?.pcie_6_plus_2_pin)}
            {renderField('SATA', f.connectors?.sata)}
            {renderField('Molex 4-pin', f.connectors?.molex_4_pin)}
  
            {renderField('Additional Info', item.additionalFeatures?.join('; '))}
          </>
        );
  
      case 'CaseFan':
        return (
          <>
            {renderField('Size (mm)', f.size)}
            {renderField('Quantity', f.quantity)}
            {renderField('Min Airflow', f.min_airflow)}
            {renderField('Max Airflow', f.max_airflow)}
            {renderField('Min Noise', f.min_noise_level)}
            {renderField('Max Noise', f.max_noise_level)}
            {renderField('PWM', f.pwm)}
            {renderField('LED', f.led)}
            {renderField('Static Pressure', f.static_pressure)}
            {renderField('Controller', f.controller)}
            {renderField('Connector', f.connector)}
            {renderField('Additional Info', item.additionalFeatures?.join('; '))}
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

      <div className="results-container">
        {results.map((item, idx) => {
          console.log('Product Item', item);

          return (
            <div key={idx} className="item-card">
              <h2 className="font-semibold text-lg p-4">{item.name}</h2>
  
              <div className="card-dropdown text-sm text-gray-700 space-y-1">
                {renderSpecs(item, item.part_category || "PCCase")}
                <button className="compare-btn">Add to Compare</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;