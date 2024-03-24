// LIBRARIES
import React from 'react';
import { StyleSheet, ScrollView, Pressable, Image, Alert } from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
// COMPONENTS
import { Text, View, FlatList, ActivityIndicator } from '../../../components/Themed';
import { HeaderText } from '../../../components/StyledText';
import { SimpleTable, SingleSelectTable, EditableTable } from '../../../components/Tables';
import { BottomButton } from '../../../components/Buttons';
// API
import { obtenerUbymedAPI } from '../../api/ubymed';

export default function ClienteScreen () {
    const [selectedRow, setSelectedRow] = React.useState(null);
    // Datos de ejemplo para la tabla
    const data = [
        { id: '1', name: 'Para mi' },
        { id: '2', name: 'Para otra persona' },
        // Agrega más opciones aquí
    ];
    const data2 = [
        { id: '1', data: {nombre: 'Mario', apellido: 'Flores', telefono: '4008-4336'} },
        { id: '2', data: {nombre: '', apellido: '', telefono: ''} },
    ];

    const handleRowSelect = (id: string) => {
        const selectedData = data2.find(row => row.id === id);
        if (selectedData) {
            const selectedRow = Object.entries(selectedData.data).map(([key, value]) => ({
                label: key,
                value: value,
            }));
            setSelectedRow(selectedRow);
        }
    };
    
    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{ title: "Paciente"}} />
            <HeaderText>¿Para quién es el servicio?</HeaderText>
            <SingleSelectTable data={data} onRowSelect={handleRowSelect} />
            {selectedRow && <EditableTable data={selectedRow} />}
            <Link href={{
                pathname: "/ordenes/consultas/motivo",
                }} asChild>
                <Pressable>
                    <BottomButton title="Siguiente" />
                </Pressable>
            </Link>
        </View>
    );
}