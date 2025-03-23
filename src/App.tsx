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
  
const renderField = (label: string, value: any) => {
  return (
    <p>
      <strong>{label}:</strong> {value || 'N/A'}
    </p>
  );
};


const renderSpecs = (item: any, category: string) => {
  switch (category) {
    case 'PCCase':
      return (
        <>
          {renderField('Price', `$${item.price}`)}
          {renderField('Dimensions', item.dimensions)}
          {renderField('Volume', item.volume)}
          {renderField('Form Factor', item.form_factor)}
          {renderField('Side Panel', item.side_panel)}
          {renderField('Power Supply', item.power_supply)}
          {renderField('Max GPU Length', item.max_gpu_length)}
          {renderField('Max GPU Cooler', item.max_gpu_cooler)}
          {renderField('3.5\" Bays', item.bays_3_5)}
          {renderField('2.5\" Bays', item.bays_2_5)}
          {renderField('Expansion Slots', item.expansion_slots)}
          {renderField('Additional Info', item.additional_info)}
        </>
      );

    case 'CPU':
      return (
        <>
          {renderField('Series', item.series)}
          {renderField('Microarchitecture', item.microarchitecture)}
          {renderField('Core Family', item.core_family)}
          {renderField('Socket', item.socket)}
          {renderField('Total Cores', item.total_cores)}
          {renderField('P-Cores', item.p_cores)}
          {renderField('E-Cores', item.e_cores)}
          {renderField('Threads', item.threads)}
          {renderField('Base Clock', item.base_clock)}
          {renderField('Boost Clock', item.boost_clock)}
          {renderField('Cache L3', item.cache_l3)}
          {renderField('TDP', item.tdp)}
          {renderField('Integrated Graphics', item.integrated_graphics)}
        </>
      );

    case 'Motherboard':
      return (
        <>
          {renderField('Socket', item.socket)}
          {renderField('Form Factor', item.form_factor)}
          {renderField('Chipset', item.chipset)}
          {renderField('Memory Type', item.memory_type)}
          {renderField('Memory Slots', item.memory_slots)}
          {renderField('Max Memory', item.max_memory)}
          {renderField('SATA 6Gb/s', item.sata_6)}
          {renderField('SATA 3Gb/s', item.sata_3)}
          {renderField('U.2 Ports', item.u2_ports)}
          {renderField('PCIe Slots', item.pcie_slots)}
          {renderField('M.2 Slots', item.m2_slots)}
          {renderField('2.5G LAN', item.lan_2_5g)}
          {renderField('USB 2.0', item.usb_2_0)}
          {renderField('USB 3.2 Gen 1', item.usb_3_2_gen1)}
          {renderField('USB 3.2 Gen 2', item.usb_3_2_gen2)}
          {renderField('USB 3.2 Gen 2x2', item.usb_3_2_gen2x2)}
          {renderField('USB 4.0', item.usb_4_0)}
          {renderField('ECC Support', item.ecc_support)}
          {renderField('RAID Support', item.raid_support)}
          {renderField('BIOS Flashback', item.bios_flashback)}
          {renderField('Clear CMOS Button', item.clear_cmos)}
          {renderField('Audio Chipset', item.audio_chipset)}
          {renderField('Audio Channels', item.audio_channels)}
          {renderField('Back Panel Ports', item.back_panel_ports)}
          {renderField('Additional Info', item.additional_info)}
        </>
      );

    case 'GPU':
      return (
        <>
          {renderField('Chipset', item.chipset)}
          {renderField('Memory', item.memory)}
          {renderField('Memory Type', item.memory_type)}
          {renderField('Core Base Clock', item.core_base_clock)}
          {renderField('Core Boost Clock', item.core_boost_clock)}
          {renderField('Memory Clock', item.memory_clock)}
          {renderField('Memory Bus', item.memory_bus)}
          {renderField('Interface', item.interface)}
          {renderField('Length', item.length)}
          {renderField('TDP', item.tdp)}
          {renderField('HDMI 2.1', item.hdmi_2_1)}
          {renderField('DisplayPort 2.1', item.displayport_2_1)}
          {renderField('Additional Info', item.additional_info)}
        </>
      );

    case 'RAM':
      return (
        <>
          {renderField('Speed', item.speed)}
          {renderField('Type', item.type)}
          {renderField('Form Factor', item.form_factor)}
          {renderField('Capacity', item.capacity)}
          {renderField('Modules', item.modules)}
          {renderField('Per Module', item.per_module)}
          {renderField('CAS Latency', item.cas_latency)}
          {renderField('Timings', item.timings)}
          {renderField('Voltage', item.voltage)}
          {renderField('Heat Spreader', item.heat_spreader)}
          {renderField('RGB', item.rgb)}
          {renderField('Height', item.height)}
        </>
      );

    case 'CPUCooler':
      return (
        <>
          {renderField('Noise', item.noise)}
          {renderField('Fan RPM', item.fan_rpm)}
          {renderField('Cooling', item.cooling)}
          {renderField('Additional Info', item.additional_info)}
        </>
      );

    case 'Storage':
      return (
        <>
          {renderField('Capacity', item.capacity)}
          {renderField('Type', item.type)}
          {renderField('Form Factor', item.form_factor)}
          {renderField('Interface', item.interface)}
          {renderField('NVMe', item.nvme)}
          {renderField('Series', item.series)}
          {renderField('Manufacturer', item.manufacturer)}
          {renderField('Additional Info', item.additional_info)}
        </>
      );

    case 'PowerSupply':
      return (
        <>
          {renderField('Wattage', item.wattage)}
          {renderField('Form Factor', item.form_factor)}
          {renderField('Efficiency', item.efficiency)}
          {renderField('Modularity', item.modularity)}
          {renderField('Length', item.length)}
          {renderField('Fanless', item.fanless)}
          {renderField('ATX 24-pin', item.atx_24_pin)}
          {renderField('EPS 8-pin', item.eps_8_pin)}
          {renderField('PCIe 12VHPWR', item.pcie_12vhpwr)}
          {renderField('PCIe 6+2-pin', item.pcie_6_2_pin)}
          {renderField('SATA', item.sata)}
          {renderField('Molex', item.molex)}
          {renderField('Additional Info', item.additional_info)}
        </>
      );

    case 'CaseFan':
      return (
        <>
          {renderField('Size', item.size)}
          {renderField('Quantity', item.quantity)}
          {renderField('Min Airflow', item.min_airflow)}
          {renderField('Max Airflow', item.max_airflow)}
          {renderField('Min Noise', item.min_noise)}
          {renderField('Max Noise', item.max_noise)}
          {renderField('PWM', item.pwm)}
          {renderField('LED', item.led)}
          {renderField('Static Pressure', item.static_pressure)}
          {renderField('Controller', item.controller)}
          {renderField('Connector', item.connector)}
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