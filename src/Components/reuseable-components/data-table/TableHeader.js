import styles from "./Table.module.css";

export default function TableHeader ({ tableHeaders }) {
    
    return (
        <thead>
            <tr className={styles.table_header_row}>
                {tableHeaders.map(header => {
                    return (
                        <th
                            className={styles.table_headers} 
                            key = {header}
                        >
                            {header}
                        </th>
                    ); 
                })}
            </tr>
        </thead>
    );
}