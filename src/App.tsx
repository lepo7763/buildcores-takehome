// App.tsx
import React, { useEffect, useState } from 'react';
import SearchBar from './components/searchBar';
import { searchParts } from './api/searchParts';
import './App.css';

/**
 * 1) Extract specs from an item (skipping "Additional Info").
 *    Returns an array of { label, value } objects.
 */
function getCompareSpecs(item: any): Array<{ label: string; value: any }> {
  const category = item.part_category || 'PCCase';
  const f = item.v2Fields || {};
  const meta = f.metadata || {};

  // We'll push specs into an array, excluding "Additional Info"
  // We'll also add Price as a "spec" so you see it in the comparison chart.
  const specs: Array<{ label: string; value: any }> = [];

  // Price (optional - you can remove if you prefer a separate row)
  if (item.price !== undefined) {
    specs.push({ label: 'Price', value: `$${item.price}` });
  }

  switch (category) {
    case 'PCCase':
      specs.push(
        { label: 'Form Factor', value: f.form_factor },
        { label: 'Side Panel', value: f.side_panel },
        { label: 'Power Supply', value: f.power_supply },
        { label: 'Max GPU Length', value: f.max_video_card_length + ' mm' },
        { label: 'Max CPU Cooler Height', value: f.max_cpu_cooler_height },
        { label: '3.5" Bays', value: f.internal_3_5_bays },
        { label: '2.5" Bays', value: f.internal_2_5_bays },
        { label: 'Expansion Slots', value: f.expansion_slots },
        { label: 'Dimensions', value: f.dimensions },
        { label: 'Volume', value: f.volume },
      );
      break;

    case 'CPU':
      specs.push(
        { label: 'Series', value: f.series || meta.series },
        { label: 'Microarchitecture', value: item.microarchitecture },
        { label: 'Core Family', value: item.coreFamily },
        { label: 'Socket', value: item.socket },
        { label: 'Total Cores', value: f.cores?.total },
        { label: 'P-Cores', value: f.cores?.performance },
        { label: 'Threads', value: f.cores?.threads },
        { label: 'Base Clock', value: f.clocks?.performance?.base },
        { label: 'Boost Clock', value: f.clocks?.performance?.boost },
        { label: 'Cache L3', value: f.cache?.l3 },
        { label: 'TDP', value: f.specifications?.tdp },
        {
          label: 'Integrated Graphics',
          value: f.specifications?.integratedGraphics?.model,
        }
      );
      break;

    case 'Motherboard':
      specs.push(
        { label: 'Socket', value: item.socket },
        { label: 'Form Factor', value: item.formFactor || f.form_factor },
        { label: 'Chipset', value: item.chipset },
        { label: 'Memory Type', value: f.memory?.ram_type },
        { label: 'Memory Slots', value: f.memory?.slots },
        { label: 'Max Memory', value: f.memory?.max },
        { label: 'SATA 6Gb/s', value: f.storage_devices?.sata_6_gb_s },
        { label: 'SATA 3Gb/s', value: f.storage_devices?.sata_3_gb_s },
        { label: 'U.2 Ports', value: f.storage_devices?.u2 },
        { label: 'PCIe Slots', value: item.pcie_x16_slots },
        { label: 'M.2 Slots', value: item.m2_slots },
        { label: '2.5G LAN', value: item.ethernet },
        { label: 'USB 2.0', value: f.usb_headers?.usb_2_0 },
        { label: 'USB 3.2 Gen 1', value: f.usb_headers?.usb_3_2_gen_1 },
        { label: 'USB 3.2 Gen 2', value: f.usb_headers?.usb_3_2_gen_2 },
        { label: 'USB 3.2 Gen 2x2', value: f.usb_headers?.usb_3_2_gen_2x2 },
        { label: 'USB 4.0', value: f.usb_headers?.usb_4 },
        { label: 'ECC Support', value: f.ecc_support },
        { label: 'RAID Support', value: f.raid_support },
        { label: 'BIOS Flashback', value: f.bios_features?.flashback },
        { label: 'Clear CMOS Button', value: f.bios_features?.clear_cmos },
        { label: 'Audio Chipset', value: f.audio?.chipset },
        { label: 'Audio Channels', value: f.audio?.channels },
        {
          label: 'Back Panel Ports',
          value: f.back_panel_ports?.join(', '),
        }
      );
      break;

    case 'GPU':
      specs.push(
        { label: 'Chipset', value: f.chipset },
        { label: 'Memory', value: f.memory },
        { label: 'Memory Type', value: f.memory_type },
        { label: 'Base Clock', value: f.core_base_clock },
        { label: 'Boost Clock', value: f.core_boost_clock },
        { label: 'Memory Clock', value: f.effective_memory_clock },
        { label: 'Memory Bus', value: f.memory_bus },
        { label: 'Interface', value: f.interface },
        { label: 'Length', value: f.length },
        { label: 'TDP', value: f.tdp },
        { label: 'HDMI 2.1', value: f.video_outputs?.hdmi_2_1 },
        { label: 'DisplayPort 2.1', value: f.video_outputs?.displayport_2_1 },
        { label: 'Cooling', value: f.cooling }
      );
      break;

    case 'RAM':
      specs.push(
        { label: 'Speed', value: f.speed },
        { label: 'Type', value: f.ram_type },
        { label: 'Form Factor', value: f.form_factor },
        { label: 'Capacity', value: f.capacity },
        { label: 'Modules', value: f.modules?.quantity },
        { label: 'Per Module', value: f.modules?.capacity_gb },
        { label: 'CAS Latency', value: f.cas_latency },
        { label: 'Timings', value: f.timings },
        { label: 'Voltage', value: f.voltage },
        { label: 'Heat Spreader', value: f.heat_spreader },
        { label: 'RGB', value: f.rgb }
      );
      break;

    case 'CPUCooler':
      specs.push(
        { label: 'Noise', value: item.noiseLevel },
        { label: 'Fan RPM', value: item.fanRPM },
        { label: 'Water Cooled', value: item.waterCooled },
        { label: 'Air Cooled', value: item.airCooled }
      );
      break;

    case 'Storage':
      specs.push(
        { label: 'Capacity', value: f.capacity },
        { label: 'Type', value: f.type },
        { label: 'Form Factor', value: f.form_factor },
        { label: 'Interface', value: f.interface },
        { label: 'NVMe', value: f.nvme }
      );
      break;

    case 'PSU':
      specs.push(
        { label: 'Wattage', value: f.wattage },
        { label: 'Form Factor', value: f.form_factor },
        { label: 'Efficiency Rating', value: f.efficiency_rating },
        { label: 'Modularity', value: f.modular },
        { label: 'Length (mm)', value: f.length },
        { label: 'Fanless', value: f.fanless },
        { label: 'Color', value: f.color },
        { label: 'ATX 24-pin', value: f.connectors?.atx_24_pin },
        { label: 'EPS 8-pin', value: f.connectors?.eps_8_pin },
        { label: 'PCIe 12VHPWR', value: f.connectors?.pcie_12vhpwr },
        { label: 'PCIe 6+2-pin', value: f.connectors?.pcie_6_plus_2_pin },
        { label: 'SATA', value: f.connectors?.sata },
        { label: 'Molex 4-pin', value: f.connectors?.molex_4_pin }
      );
      break;

    case 'CaseFan':
      specs.push(
        { label: 'Size (mm)', value: f.size },
        { label: 'Quantity', value: f.quantity },
        { label: 'Min Airflow', value: f.min_airflow },
        { label: 'Max Airflow', value: f.max_airflow },
        { label: 'Min Noise', value: f.min_noise_level },
        { label: 'Max Noise', value: f.max_noise_level },
        { label: 'PWM', value: f.pwm },
        { label: 'LED', value: f.led },
        { label: 'Static Pressure', value: f.static_pressure },
        { label: 'Controller', value: f.controller },
        { label: 'Connector', value: f.connector }
      );
      break;

    default:
      specs.push({ label: 'No specs available', value: 'N/A' });
  }

  return specs;
}

/**
 * 2) Gather all unique "labels" from the specs of every item,
 *    so we know which rows to display in the comparison table.
 */
function buildAllLabels(items: any[]): string[] {
  const allLabels = new Set<string>();

  items.forEach((item) => {
    const specs = getCompareSpecs(item);
    specs.forEach((s) => {
      allLabels.add(s.label);
    });
  });

  return Array.from(allLabels);
}

function App() {
  const [results, setResults] = useState<any[]>([]);
  const [compareList, setCompareList] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [lastQuery, setLastQuery] = useState('');
  const [lastCategory, setLastCategory] = useState('');
  const [warnOnCategorySwitch, setWarnOnCategorySwitch] = useState(true);
  const isInCompareList = (item: any) => {
    const key = getUniqueKey(item);
    return compareList.some((compItem) => getUniqueKey(compItem) === key);
  }

  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const handleToggleRow = (rowIndex: number) => {
    setExpandedRows((prev) => {
      if (prev.includes(rowIndex)) {
        
        return prev.filter((idx) => idx !== rowIndex);
      } else {
        return [...prev, rowIndex];
      }
    });
  };

  const handleSearch = (query: string, category: string) => {
    const isDifferentCategory = category !== lastCategory;
  
    if (compareList.length > 0 && isDifferentCategory) {
      if (warnOnCategorySwitch) {
        const confirmed = window.confirm(
          "Switching categories will clear your current comparisons. Continue?"
        );
        if (!confirmed) return;
      }
      setCompareList([]);
    }
    setExpandedRows([]);
    setLastQuery(query);
    setLastCategory(category);
    setPage(0);
  };
  
  

  const fetchPageData = async () => {
    if (!lastCategory) return;

    try {
      const skipValue = page * 20;
      const res = await searchParts(lastQuery, lastCategory, skipValue);
      setResults(res.data);
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  /**
   * We create a unique key for each item so we don’t block adding multiple items
   * with the same name, but from different categories or with different specs.
   */
  function getUniqueKey(item: any) {
    return item.id || `${item.name}-${item.price}-${item.part_category}`;
  }

  const handleAddToCompare = (item: any) => {
    const key = getUniqueKey(item);
    if (
      !compareList.find(
        (compItem) => getUniqueKey(compItem) === key
      )
    ) {
      setCompareList((prev) => [...prev, item]);
    }
  };

  const handleRemoveFromCompare = (itemToRemove: any) => {
    const removeKey = getUniqueKey(itemToRemove);
    setCompareList((prev) =>
      prev.filter((compItem) => getUniqueKey(compItem) !== removeKey)
    );
  };

  useEffect(() => {
    console.log('Fetching page data for:', lastQuery, lastCategory, page);
    if (lastCategory) {
      fetchPageData();
    }
  }, [page, lastQuery, lastCategory]);

  const renderField = (label: string, value: any) => {
    let displayValue = value;
    if (typeof value === 'boolean') {
      displayValue = value ? 'Yes' : 'No';
    } else if (value === null || value === undefined || value === '') {
      displayValue = 'N/A';
    }

    return (
      <div className="flex" key={label}>
        <span className="w-32 font-semibold">{label}:</span>
        <span>{displayValue}</span>
      </div>
    );
  };

  /**
   * Renders the "expanded specs row" details. This is the original approach
   * you had for the item’s details. We keep it separate from the comparison
   * approach so we can show all specs in the collapsible section, including
   * Additional Info, if desired.
   */
  const renderSpecs = (item: any) => {
    const category = item.part_category || 'PCCase';
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
            {renderField(
              'Additional Info',
              item.additionalFeatures?.join('; ')
            )}
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

  /**
   * For the table, you wanted a short main spec to show in the “Form” column, etc.
   */
  const getMainSpecForCategory = (item: any) => {
    const category = item.part_category || '';
    const f = item.v2Fields || {};

    switch (category) {
      case 'PCCase':
        return f.form_factor || '—';
      case 'CPU':
        return `${f.cores?.total || '—'} Cores`;
      case 'Motherboard':
        return f.chipset || '—';
      case 'GPU':
        return `${f.memory || '—'} VRAM`;
      case 'RAM':
        return `${f.capacity || '—'} ${f.ram_type || ''}`;
      case 'CPUCooler':
        return item.airCooled ? 'Air' : item.waterCooled ? 'Water' : '—';
      case 'Storage':
        return `${f.capacity || '—'} ${f.type || ''}`;
      case 'PSU':
        return `${f.wattage || '—'}W`;
      case 'CaseFan':
        return `${f.size || '—'}mm`;
      default:
        return '—';
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold p-4">Compare Buildcores PC Components</h1>
      <SearchBar 
        onSearch={handleSearch}
        warnOnCategorySwitch={warnOnCategorySwitch}
        setWarnOnCategorySwitch={setWarnOnCategorySwitch}
      />

      {/* Table container */}
      <div className="table-container">
        <table className="parts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Form</th>
              <th>Price</th>
              <th></th> {/* for Details/Compare buttons */}
            </tr>
          </thead>
          <tbody>
            {results.map((item, idx) => {
              const formFactor = getMainSpecForCategory(item);
              const price =
                item.price !== undefined ? `$${item.price}` : '—';
              const isExpanded = expandedRows.includes(idx);

              return (
                <React.Fragment key={getUniqueKey(item)}>
                  {/* Main row */}
                  <tr>
                    <td className="td-name">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="product-image"
                          style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'cover',
                          }}
                        />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>{formFactor}</td>
                    <td>{price}</td>
                    <td>
                      <button onClick={() => handleToggleRow(idx)}>
                        {isExpanded ? 'Hide' : 'Details'}
                      </button>
                      &nbsp;
                      <button 
                        onClick={() => handleAddToCompare(item)}
                        disabled={isInCompareList(item)}
                        style={{
                          backgroundColor: isInCompareList(item) ? '#888' : '#007bff',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          cursor: isInCompareList(item) ? 'not-allowed' : 'pointer',
                          border: 'none',
                        }}
                        >
                          {isInCompareList(item) ? 'In Comparison' : 'Compare'}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded specs row */}
                  <tr data-expanded={isExpanded ? 'true' : 'false'}>
                    <td colSpan={4} style={{ padding: 0 }}>
                      <div className="collapsible-container">
                        {renderSpecs(item)}
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* pagination-controls */}
      <div className="pagination-controls" style={{ marginTop: '1rem' }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Prev
        </button>
        <span style={{ margin: '0 1rem' }}>
          Showing {page * 20 + 1} - {page * 20 + results.length}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          // Disabled if the backend doesn't return more than 20 results
          disabled={results.length < 20}
        >
          Next
        </button>
      </div>

      {/* Comparison Chart */}
      <ComparisonChart
        items={compareList}
        onRemoveItem={handleRemoveFromCompare}
      />
    </div>
  );
}

/* 
  3) The dynamic ComparisonChart:
     - Gathers all "labels" from each item’s specs
     - Creates one table row per label
     - For each item, finds the matching spec for that label
*/
function ComparisonChart({
  items,
  onRemoveItem,
}: {
  items: any[];
  onRemoveItem: (item: any) => void;
}) {
  if (items.length === 0) return null;

  // Build the complete set of specs from all items
  const allLabels = buildAllLabels(items);

  return (
    <div className="comparison-chart" style={{ marginTop: '2rem' }}>
      <h2>Comparison</h2>

      <table>
        <thead>
          <tr>
            <th>Specs</th>
            {items.map((item) => {
              const key = item.id || item.name;
              return (
                <th key={key}>
                  {item.name}
                  &nbsp;
                  <button onClick={() => onRemoveItem(item)}>✕</button>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {/* For each spec label, render one row */}
          {allLabels.map((label) => (
            <tr key={label}>
              {/* The label in the first column */}
              <td>{label}</td>
              {/* Then each item’s value in the subsequent columns */}
              {items.map((item) => {
                const specs = getCompareSpecs(item);
                // Try to find the spec object for the current label
                const matchedSpec = specs.find((s) => s.label === label);
                // If no match, it's 'N/A'
                const displayValue = matchedSpec
                  ? matchedSpec.value
                  : 'N/A';
                return (
                  <td key={item.id || item.name}>
                    {/* Convert booleans or null to something readable if needed */}
                    {displayValue === true
                      ? 'Yes'
                      : displayValue === false
                      ? 'No'
                      : displayValue ?? 'N/A'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
