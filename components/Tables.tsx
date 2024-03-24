import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';

interface SimpleTableProps {
  data: any[];
}

export const SimpleTable: React.FC<SimpleTableProps> = ({ data }) => {
  return (
    <View style={simpleTableStyles.table}>
      {data.map((row, rowIndex) => (
        <View 
          key={rowIndex} 
          style={[
            simpleTableStyles.row, 
            rowIndex < data.length - 1 ? simpleTableStyles.rowWithBorder : {}
          ]}
        >
          {Object.values(row).map((cell, cellIndex) => (
            <Text key={cellIndex} style={cellIndex === 0 ? simpleTableStyles.firstCell : simpleTableStyles.secondCell}>
              {String(cell)}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

interface EditableTableProps {
  data: { label: string; value: string }[];
}

export const EditableTable: React.FC<EditableTableProps> = ({ data }) => {
  const [inputValues, setInputValues] = React.useState<string[]>(data.map(item => item.value));

  React.useEffect(() => {
    setInputValues(data.map(item => item.value));
  }, [data]);

  const handleTextChange = (text: string, index: number) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);
  };

  return (
    <View style={simpleTableStyles.table}>
      {data.map((row, rowIndex) => (
        <View 
          key={rowIndex} 
          style={[
            simpleTableStyles.row, 
            rowIndex < data.length - 1 ? simpleTableStyles.rowWithBorder : {}
          ]}
        >
          <Text style={simpleTableStyles.firstCell}>{row.label}</Text>
          <TextInput 
            style={simpleTableStyles.secondCell} 
            value={inputValues[rowIndex]} 
            onChangeText={(text) => handleTextChange(text, rowIndex)} 
          />
        </View>
      ))}
    </View>
  );
};

interface CheckboxProps {
  isSelected: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ isSelected }) => (
  <View style={singleSelectTableStyles.checkbox}>
    {isSelected && <View style={singleSelectTableStyles.checkmark} />}
  </View>
);

interface SingleSelectTableProps extends SimpleTableProps {
  onRowSelect: (id: string) => void;
}

export const SingleSelectTable: React.FC<SingleSelectTableProps> = ({ data, onRowSelect }) => {
  const [selectedRow, setSelectedRow] = React.useState<string | null>(null);

  const handleRowPress = (id: string) => {
    setSelectedRow(selectedRow === id ? null : id);
    onRowSelect(id);
  };

  return (
    <View style={singleSelectTableStyles.table}>
      {data.map((row: any, index) => (
        <Pressable 
          key={row.id} 
          style={[
            singleSelectTableStyles.row, 
            index < data.length - 1 ? singleSelectTableStyles.rowWithBorder : {}
          ]}
          onPress={() => handleRowPress(row.id)}
        >
          <Checkbox isSelected={selectedRow === row.id} />
          <Text style={singleSelectTableStyles.cell}>{row.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const simpleTableStyles = StyleSheet.create({
  table: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  rowWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  firstCell: {
    flex: 1,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  secondCell: {
    flex: 2,
    textAlign: 'right',
  },
});

const singleSelectTableStyles = StyleSheet.create({
  table: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#FFFFFF', // Color de fondo blanco
    borderRadius: 24, // Bordes redondeados
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16, // Padding para la fila
  },
  rowWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  cell: {
    marginLeft: 10,
    textAlign: 'left', // Alinear texto a la izquierda
  },
  checkbox: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
});