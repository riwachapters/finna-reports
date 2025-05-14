"use client";

import { useCallback, useState } from "react";
import {
  FinancialSectionGroup,
  FinancialSubsectionGroup,
  FinancialTable,
  FinancialTableHeader,
  FinancialTableSkeleton,
  NetAssetsRow,
  NetAssetsSummaryRow,
  ReportTitle,
  SeparatorRow
} from "@/components/financial";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useReportData } from "@/hooks/useReportData";
import { useChangesInNetAssetsCalculations } from "@/hooks/useChangesInNetAssetsCalculations";
import { cn } from "@/lib/utils";
import { debounce } from "@/lib/debounce";
import React from "react";

// Type for edited values
interface EditedValues {
  [rowId: string]: {
    [field: string]: string | number;
  };
}

export default function ChangesInNetAssetsPage() {
  // Group all useState hooks together at the top
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState<EditedValues>({});

  // Get report data from the hook
  const { title, sections, loading, error } = useReportData('changes-assets');
  
  // Use the custom hook for calculations
  const netAssets = useChangesInNetAssetsCalculations(sections, loading);
  
  // Create a debounced handler for value changes
  const debouncedValueChange = useCallback(
    debounce((rowId: string, data: { field: string; value: string | number }) => {
      setEditedValues(prev => ({
        ...prev,
        [rowId]: {
          ...prev[rowId],
          [data.field]: data.value
        }
      }));
      
      // In a real implementation, this would update the backend data
      console.log(`Updated ${rowId} ${data.field} to:`, data.value);
    }, 300),
    []
  );
  
  // Handler for value changes in editable mode
  const handleValueChange = useCallback((rowId: string, data: { field: string; value: string | number }) => {
    // Update immediately for UI responsiveness
    setEditedValues(prev => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [data.field]: data.value
      }
    }));
    
    // Use debounced update for backend
    debouncedValueChange(rowId, data);
  }, [debouncedValueChange]);
  
  // Function to get value (edited or original)
  const getValue = (rowId: string, field: string, originalValue: any) => {
    return editedValues[rowId]?.[field] !== undefined 
      ? editedValues[rowId][field] 
      : originalValue;
  };
  
  // Function to calculate total dynamically, if necessary
  const calculateTotal = (surplus: any, adjustments: any) => {
    const s = typeof surplus === 'number' ? surplus : parseFloat(surplus || '0') || 0;
    const a = typeof adjustments === 'number' ? adjustments : parseFloat(adjustments || '0') || 0;
    return s + a;
  };
  
  // Generate a better row ID based on section, subsection, and label
  const generateRowId = (sectionKey: string, subsectionKey: string | undefined, label: string, index: number) => {
    const cleanLabel = label.replace(/[\s/()]+/g, "_").toLowerCase();
    return subsectionKey 
      ? `${sectionKey}-${subsectionKey}-${cleanLabel}-${index}`
      : `${sectionKey}-${cleanLabel}-${index}`;
  };
  
  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
    // Reset edited values when exiting edit mode
    if (isEditMode) {
      setEditedValues({});
    }
  };
  
  // If loading, show skeleton
  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <FinancialTableSkeleton />
      </div>
    );
  }
  
  // If error, show error message
  if (error) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }
  
  return (
    <TooltipProvider>
      <div className="container mx-auto py-8 print:py-4">
        <div className="flex justify-end mb-4 print:hidden">
          <button
            onClick={toggleEditMode}
            className={cn(
              "px-4 py-2 rounded transition-colors",
              isEditMode 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "bg-muted hover:bg-muted/80"
            )}
          >
            {isEditMode ? "Exit Edit Mode" : "Edit Values"}
          </button>
        </div>
        
        <ReportTitle 
          governmentBody={title.governmentBody}
          program={title.program}
          reportType={title.reportType}
          statement={title.statement}
        />
        
        <div className="mt-4 financial-table print-include">
          <FinancialTable 
            className="print-include" 
            caption="Statement of Changes in Net Assets"
            ariaLabel="Statement of Changes in Net Assets table"
          >
            <FinancialTableHeader 
              columns={[
                { key: 'description', label: 'Description' },
                { key: 'surplus', label: 'Accumulated Surplus/Loss (Frw)' },
                { key: 'adjustments', label: 'Adjustments (Frw)' },
                { key: 'total', label: 'Total (Frw)' },
              ]} 
            />
            
            {/* Dynamically render sections */}
            {sections.map((section) => (
              <FinancialSectionGroup key={section.key} title={section.title}>
                {section.subsections?.map((subsection) => (
                  <React.Fragment key={subsection.key}>
                    <FinancialSubsectionGroup title={subsection.title} className="pl-4">
                      {subsection.rows.map((row, index) => {
                        const rowId = generateRowId(section.key, subsection.key, row.label, index);
                        return (
                          <NetAssetsRow 
                            key={rowId}
                            label={row.label}
                            note={getValue(rowId, "note", row.note)}
                            surplus={getValue(rowId, "surplus", row.surplus)}
                            adjustments={getValue(rowId, "adjustments", row.adjustments)}
                            total={getValue(rowId, "total", row.total ?? calculateTotal(row.surplus, row.adjustments))}
                            isTotal={row.isTotal}
                            indentLevel={row.indentLevel}
                            editable={isEditMode}
                            onValueChange={(data) => handleValueChange(rowId, data)}
                            className={row.isTotal ? "bg-muted/30 font-semibold" : ""}
                          />
                        );
                      })}
                    </FinancialSubsectionGroup>
                    <SeparatorRow />
                  </React.Fragment>
                ))}
                
                {/* Show non-subsectioned rows */}
                {section.rows.map((row, index) => {
                  const rowId = generateRowId(section.key, undefined, row.label, index);
                  return (
                    <NetAssetsRow 
                      key={rowId}
                      label={row.label}
                      note={getValue(rowId, "note", row.note)}
                      surplus={getValue(rowId, "surplus", row.surplus)}
                      adjustments={getValue(rowId, "adjustments", row.adjustments)}
                      total={getValue(rowId, "total", row.total ?? calculateTotal(row.surplus, row.adjustments))}
                      isTotal={row.isTotal}
                      editable={isEditMode}
                      onValueChange={(data) => handleValueChange(rowId, data)}
                      className={row.isTotal ? "bg-muted/30 font-semibold" : ""}
                    />
                  );
                })}
                
                {section.isSummarySection && (
                  <NetAssetsSummaryRow 
                    label="TOTAL NET ASSETS" 
                    surplus={17700000}
                    adjustments={-160000}
                    total={netAssets}
                    isHighlighted={true}
                  />
                )}
                <SeparatorRow />
              </FinancialSectionGroup>
            ))}
          </FinancialTable>
        </div>
      </div>
    </TooltipProvider>
  );
}
