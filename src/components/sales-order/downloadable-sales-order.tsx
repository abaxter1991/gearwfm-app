import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer'
import type { SalesOrderAndRelations } from '~/types'

type Props = {
    salesOrder: SalesOrderAndRelations
}

export function DownloadableSalesOrder({ salesOrder }: Props) {
    return (
        <Document>
            <Page orientation="landscape" style={styles.page}>
                <View style={styles.salesOrderSection}>
                    <View style={styles.salesOrderSectionColumn}>
                        <View style={styles.fieldRow}>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.fieldLabel}>Order Date</Text>
                                <Text style={styles.fieldValue}>{new Date(salesOrder.orderDate).toLocaleDateString()}</Text>
                            </View>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.fieldLabel}>Due Date</Text>
                                <Text style={styles.fieldValue}>{new Date(salesOrder.dueDate).toLocaleDateString()}</Text>
                            </View>
                        </View>
                        <View style={styles.fieldRow}>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.fieldLabel}>Reference #</Text>
                                <Text style={styles.fieldValue}>{salesOrder.referenceId || ' '}</Text>
                            </View>
                        </View>
                        <View style={styles.fieldRow}>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.fieldLabel}>Sales Rep Name</Text>
                                <Text style={styles.fieldValue}>{salesOrder.salesRepName || ' '}</Text>
                            </View>
                        </View>
                        <View style={styles.fieldRow}>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.fieldLabel}>Sales Rep Email Address</Text>
                                <Text style={styles.fieldValue}>{salesOrder.salesRepEmailAddress || ' '}</Text>
                            </View>
                        </View>
                        <View style={styles.fieldRow}>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.fieldLabel}>New Customer</Text>
                                <Text style={styles.fieldValue}>{salesOrder.isNewCustomer ? 'Yes' : 'No'}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.salesOrderSectionColumn}>
                        <View style={styles.fieldRow}>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.fieldLabel}>Company Name</Text>
                                <Text style={styles.fieldValue}>{salesOrder.companyName || ' '}</Text>
                            </View>
                        </View>
                        <View style={styles.fieldRow}>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.fieldLabel}>Contact Name</Text>
                                <Text style={styles.fieldValue}>{salesOrder.contactName || ' '}</Text>
                            </View>
                        </View>
                        <View style={styles.fieldRow}>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.fieldLabel}>Phone Number</Text>
                                <Text style={styles.fieldValue}>{salesOrder.phoneNumber || ' '}</Text>
                            </View>
                        </View>
                        <View style={styles.fieldRow}>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.fieldLabel}>Email Address</Text>
                                <Text style={styles.fieldValue}>{salesOrder.emailAddress || ' '}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.salesOrderSectionColumn}>
                        <View style={styles.fieldRow}>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.fieldLabel}>Shipping Address</Text>
                                <Text style={styles.fieldValue}>{salesOrder.shippingAddress || ' '}</Text>
                            </View>
                        </View>
                        <View style={styles.fieldRow}>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.fieldLabel}>Billing Address</Text>
                                <Text style={styles.fieldValue}>{salesOrder.billingAddress || ' '}</Text>
                            </View>
                        </View>
                        <View style={styles.fieldRow}>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.fieldLabel}>Notes</Text>
                                <Text style={styles.fieldValue}>{salesOrder.notes || ' '}</Text>
                            </View>
                        </View>
                        <View style={styles.fieldRow}>
                            <View style={styles.fieldGroup}>
                                <Text style={styles.fieldLabel}>Tracking #</Text>
                                <Text style={styles.fieldValue}>{salesOrder.trackingNumber || ' '}</Text>
                            </View>
                        </View>
                    </View>

                </View>
                <View>
                    <View style={styles.fieldRow}>
                        <View style={{ ...styles.fieldGroupNoLabel, border: 0, padding: 0, textAlign: 'center', width: '45' }}>
                            <Text style={styles.fieldLabel}>Item</Text>
                        </View>
                        <View style={{ ...styles.fieldGroupNoLabel, border: 0, padding: 0, textAlign: 'center', width: '100' }}>
                            <Text style={styles.fieldLabel}>File Name</Text>
                        </View>
                        <View style={{ ...styles.fieldGroupNoLabel, border: 0, padding: 0, textAlign: 'center', width: '100' }}>
                            <Text style={styles.fieldLabel}>Style</Text>
                        </View>
                        <View style={{ ...styles.fieldGroupNoLabel, border: 0, padding: 0, textAlign: 'center', width: '65' }}>
                            <Text style={styles.fieldLabel}>Color</Text>
                        </View>
                        <View style={{ ...styles.fieldGroupNoLabel, border: 0, padding: 0, textAlign: 'center', width: '65' }}>
                            <Text style={styles.fieldLabel}>Mockup</Text>
                        </View>
                        <View style={{ ...styles.fieldGroupNoLabel, border: 0, padding: 0, textAlign: 'center', width: '100' }}>
                            <Text style={styles.fieldLabel}>Notes</Text>
                        </View>
                        <View style={{ ...styles.fieldGroupNoLabel, border: 0, padding: 0, textAlign: 'center', width: '20' }}>
                            <Text style={styles.fieldLabel}>XS</Text>
                        </View>
                        <View style={{ ...styles.fieldGroupNoLabel, border: 0, padding: 0, textAlign: 'center', width: '20' }}>
                            <Text style={styles.fieldLabel}>SM</Text>
                        </View>
                        <View style={{ ...styles.fieldGroupNoLabel, border: 0, padding: 0, textAlign: 'center', width: '20' }}>
                            <Text style={styles.fieldLabel}>MD</Text>
                        </View>
                        <View style={{ ...styles.fieldGroupNoLabel, border: 0, padding: 0, textAlign: 'center', width: '20' }}>
                            <Text style={styles.fieldLabel}>LG</Text>
                        </View>
                        <View style={{ ...styles.fieldGroupNoLabel, border: 0, padding: 0, textAlign: 'center', width: '20' }}>
                            <Text style={styles.fieldLabel}>XL</Text>
                        </View>
                        <View style={{ ...styles.fieldGroupNoLabel, border: 0, padding: 0, textAlign: 'center', width: '20' }}>
                            <Text style={styles.fieldLabel}>2XL</Text>
                        </View>
                        <View style={{ ...styles.fieldGroupNoLabel, border: 0, padding: 0, textAlign: 'center', width: '20' }}>
                            <Text style={styles.fieldLabel}>3XL</Text>
                        </View>
                        <View style={{ ...styles.fieldGroupNoLabel, border: 0, padding: 0, textAlign: 'center', width: '20' }}>
                            <Text style={styles.fieldLabel}>4XL</Text>
                        </View>
                        <View style={{ ...styles.fieldGroupNoLabel, border: 0, padding: 0, textAlign: 'center', width: '50' }}>
                            <Text style={styles.fieldLabel}>Quantity</Text>
                        </View>
                        <View style={{ ...styles.fieldGroupNoLabel, border: 0, padding: 0, textAlign: 'center', width: '50' }}>
                            <Text style={styles.fieldLabel}>Unit Price</Text>
                        </View>
                        <View style={{ ...styles.fieldGroupNoLabel, border: 0, padding: 0, textAlign: 'center', width: '50' }}>
                            <Text style={styles.fieldLabel}>Subtotal</Text>
                        </View>
                    </View>
                    {salesOrder.products.map((product) => (
                        <View key={product.id} style={styles.fieldRow}>
                            <View style={{ ...styles.fieldGroupNoLabel, width: '45' }}>
                                <Text style={styles.fieldValue}>{product.item || ' '}</Text>
                            </View>
                            <View style={{ ...styles.fieldGroupNoLabel, width: '100' }}>
                                <Text style={styles.fieldValue}>{product.fileName || ' '}</Text>
                            </View>
                            <View style={{ ...styles.fieldGroupNoLabel, width: '100' }}>
                                <Text style={styles.fieldValue}>{product.style || ' '}</Text>
                            </View>
                            <View style={{ ...styles.fieldGroupNoLabel, width: '65' }}>
                                <Text style={styles.fieldValue}>{product.color || ' '}</Text>
                            </View>
                            <View style={{ ...styles.fieldGroupNoLabel, width: '65' }}>
                                {/* @ts-ignore */}
                                <Image style={styles.fieldValue} source={product.mockupImageUrl} />
                            </View>
                            <View style={{ ...styles.fieldGroupNoLabel, width: '100' }}>
                                <Text style={styles.fieldValue}>{product.notes || ' '}</Text>
                            </View>
                            <View style={{ ...styles.fieldGroupNoLabel, width: '20' }}>
                                <Text style={styles.fieldValue}>{product.quantityOfXS}</Text>
                            </View>
                            <View style={{ ...styles.fieldGroupNoLabel, width: '20' }}>
                                <Text style={styles.fieldValue}>{product.quantityOfSM}</Text>
                            </View>
                            <View style={{ ...styles.fieldGroupNoLabel, width: '20' }}>
                                <Text style={styles.fieldValue}>{product.quantityOfMD}</Text>
                            </View>
                            <View style={{ ...styles.fieldGroupNoLabel, width: '20' }}>
                                <Text style={styles.fieldValue}>{product.quantityOfLG}</Text>
                            </View>
                            <View style={{ ...styles.fieldGroupNoLabel, width: '20' }}>
                                <Text style={styles.fieldValue}>{product.quantityOfXL}</Text>
                            </View>
                            <View style={{ ...styles.fieldGroupNoLabel, width: '20' }}>
                                <Text style={styles.fieldValue}>{product.quantityOf2XL}</Text>
                            </View>
                            <View style={{ ...styles.fieldGroupNoLabel, width: '20' }}>
                                <Text style={styles.fieldValue}>{product.quantityOf3XL}</Text>
                            </View>
                            <View style={{ ...styles.fieldGroupNoLabel, width: '20' }}>
                                <Text style={styles.fieldValue}>{product.quantityOf4XL}</Text>
                            </View>
                            <View style={{ ...styles.fieldGroupNoLabel, width: '50' }}>
                                <Text style={styles.fieldValue}>{product.totalQuantity}</Text>
                            </View>
                            <View style={{ ...styles.fieldGroupNoLabel, width: '50' }}>
                                <Text style={styles.fieldValue}>${product.unitPrice}</Text>
                            </View>
                            <View style={{ ...styles.fieldGroupNoLabel, width: '50' }}>
                                <Text style={styles.fieldValue}>${product.subtotal}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <View style={styles.footerSection}>
                    <View style={styles.footerInnerWrapper}>
                        <View style={styles.fieldRow}>
                            <Text style={styles.fieldValue}>Discount</Text>
                            <Text style={styles.fieldValue}>{salesOrder.discount}%</Text>
                        </View>
                        <View style={styles.fieldRow}>
                            <Text style={styles.fieldValue}>Shipping Cost</Text>
                            <Text style={styles.fieldValue}>${salesOrder.shippingPrice}</Text>
                        </View>
                        <View style={styles.fieldRow}>
                            <Text style={styles.fieldValue}>Grand Total</Text>
                            <Text style={styles.fieldValue}>${salesOrder.grandTotal}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        padding: 20,
    },
    salesOrderSection: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        border: 1,
        borderRadius: 4,
        borderColor: '#E4E4E7',
        padding: 6,
        marginBottom: 20,
    },
    salesOrderSectionColumn: {
        display: 'flex',
        flexDirection: 'column',
        width: '33.333333%',
    },
    productsSection: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        border: 1,
        borderRadius: 4,
        borderColor: '#E4E4E7',
        padding: 6,
        marginBottom: 20,
    },
    footerSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },
    footerInnerWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '125',
        border: 1,
        borderColor: '#E4E4E7',
        padding: 2,
        paddingRight: 8,
    },
    fieldRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    fieldGroupWrapper: {
        flex: 'auto',
    },
    fieldGroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        border: 1,
        borderRadius: 4,
        borderColor: '#E4E4E7',
        margin: 2,
        padding: 2,
    },
    fieldGroupNoLabel: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        border: 1,
        borderColor: '#E4E4E7',
        padding: 2,
    },
    fieldLabel: {
        fontSize: 4,
        lineHeight: 1,
        textTransform: 'uppercase',
        marginBottom: 6,
        color: '#71717A',
    },
    fieldValue: {
        fontSize: 7,
        lineHeight: 1.25,
        marginLeft: 8,
        color: '#71717A',
    },
})
