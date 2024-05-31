var g_data = {"name":"/shark0/processing/cv32e40p/users/processing/PRODUCTS_DIGITAL_DESIGN/PANTHER/PANTHER_1.0/CV32/NR/CFG_P_Z0/NR_QUESTA_INT_DEBUG_LONG/workdir/lib/uvm_agents/uvma_obi_memory/src/comps/uvma_obi_memory_cov_model.sv","src":"// \n// Copyright 2021 OpenHW Group\n// Copyright 2021 Datum Technology Corporation\n// SPDX-License-Identifier: Apache-2.0 WITH SHL-2.1\n// \n// Licensed under the Solderpad Hardware License v 2.1 (the \"License\"); you may\n// not use this file except in compliance with the License, or, at your option,\n// the Apache License version 2.0. You may obtain a copy of the License at\n// \n//     https://solderpad.org/licenses/SHL-2.1/\n// \n// Unless required by applicable law or agreed to in writing, any work\n// distributed under the License is distributed on an \"AS IS\" BASIS, WITHOUT\n// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the\n// License for the specific language governing permissions and limitations\n// under the License.\n// \n\n\n`ifndef __UVMA_OBI_MEMORY_COV_MODEL_SV__\n`define __UVMA_OBI_MEMORY_COV_MODEL_SV__\n\n   /*\n   * Covergroups\n   * Decalred at package-level to enable mutliple instances per monitor class (e.g. read/write)\n   */\ncovergroup cg_obi_delay(string name) with function sample(uvma_obi_memory_mon_trn_c trn);\n   option.per_instance = 1;\n   option.name         = name;\n\n   req_to_gnt: coverpoint (trn.gnt_latency) {\n      bins dly[] = { [0:3] };\n   }\n   rready_to_rvalid: coverpoint (trn.rvalid_latency) {\n      bins dly[] = { [0:3] };\n   }\n\n   dly_cross: cross req_to_gnt, rready_to_rvalid;\n\nendgroup : cg_obi_delay\n\ncovergroup cg_obi(string name,\n                  bit write_enabled,\n                  bit read_enabled,\n                  bit is_1p2)\n   with function sample(uvma_obi_memory_mon_trn_c trn);\n\n   option.per_instance = 1;\n   option.name         = name;\n\n   we: coverpoint (trn.access_type) {\n      ignore_bins IGN_WRITE = {UVMA_OBI_MEMORY_ACCESS_WRITE} with ((item >= 0) && (!write_enabled));\n      ignore_bins IGN_READ  = {UVMA_OBI_MEMORY_ACCESS_READ}  with ((item >= 0) && (!read_enabled));\n      bins WRITE = {UVMA_OBI_MEMORY_ACCESS_WRITE};\n      bins READ = {UVMA_OBI_MEMORY_ACCESS_READ};\n   }\n\n   memtype: coverpoint (trn.memtype) {\n      ignore_bins IGN_MEMTYPE = {[0:$]} with ((item >= 0) && (!is_1p2));\n   }\n\n   prot: coverpoint (trn.prot) {\n      ignore_bins IGN_MEMTYPE = {[0:$]} with ((item >= 0) && (!is_1p2));\n      ignore_bins IGN_RSVD_PRIV = {3'b100, 3'b101};\n   }\n\n   err: coverpoint (trn.err) {\n      ignore_bins IGN_ERR = {[0:$]} with ((item >=0 ) && (!is_1p2));\n   }\n\nendgroup : cg_obi\n\n/**\n * Component encapsulating Open Bus Interface functional coverage model.\n */\nclass uvma_obi_memory_cov_model_c extends uvm_component;\n   \n   // Objects\n   uvma_obi_memory_cfg_c            cfg;\n   uvma_obi_memory_cntxt_c          cntxt;\n   \n   // TLM\n   uvm_tlm_analysis_fifo#(uvma_obi_memory_mon_trn_c      )  mon_trn_fifo      ;\n   uvm_tlm_analysis_fifo#(uvma_obi_memory_mstr_seq_item_c)  mstr_seq_item_fifo;\n   uvm_tlm_analysis_fifo#(uvma_obi_memory_slv_seq_item_c )  slv_seq_item_fifo ;\n\n   // Covergroup instances   \n   cg_obi       obi_cg;\n   cg_obi_delay wr_delay_cg;\n   cg_obi_delay rd_delay_cg;\n\n   `uvm_component_utils_begin(uvma_obi_memory_cov_model_c)\n      `uvm_field_object(cfg  , UVM_DEFAULT)\n      `uvm_field_object(cntxt, UVM_DEFAULT)\n   `uvm_component_utils_end\n      \n   /**\n    * Default constructor.\n    */\n   extern function new(string name=\"uvma_obi_memory_cov_model\", uvm_component parent=null);\n   \n   /**\n    * 1. Ensures cfg & cntxt handles are not null.\n    * 2. Builds fifos.\n    */\n   extern virtual function void build_phase(uvm_phase phase);\n   \n   /**\n    * Forks all sampling loops\n    */\n   extern virtual task run_phase(uvm_phase phase);\n   \n   /**\n    * TODO Describe uvma_obi_memory_cov_model_c::sample_cfg()\n    */\n   extern function void sample_cfg();\n   \n   /**\n    * TODO Describe uvma_obi_memory_cov_model_c::sample_cntxt()\n    */\n   extern function void sample_cntxt();\n   \n   /**\n    * Sample covergroups for monitored OBI transactions\n    */\n   extern function void sample_mon_trn(uvma_obi_memory_mon_trn_c trn);\n   \n   /**\n    * TODO Describe uvma_obi_memory_cov_model_c::sample_mstr_seq_item()\n    */\n   extern function void sample_mstr_seq_item();\n   \n   /**\n    * TODO Describe uvma_obi_memory_cov_model_c::sample_slv_seq_item()\n    */\n   extern function void sample_slv_seq_item();\n   \nendclass : uvma_obi_memory_cov_model_c\n\n\nfunction uvma_obi_memory_cov_model_c::new(string name=\"uvma_obi_memory_cov_model\", uvm_component parent=null);\n   \n   super.new(name, parent);\n   \nendfunction : new\n\n\n// A significant chunk of the build_phase method is common between this\n// coverage model and the sequencer (uvma_obi_memory_sqr).  This is\n// appropriate so the duplicated code has a lint waiver.\n//\n//@DVT_LINTER_WAIVER_START \"MT20210901_1\" disable SVTB.33.1.0, SVTB.33.2.0\nfunction void uvma_obi_memory_cov_model_c::build_phase(uvm_phase phase);\n   \n   super.build_phase(phase);\n   \n   void'(uvm_config_db#(uvma_obi_memory_cfg_c)::get(this, \"\", \"cfg\", cfg));\n   if (cfg == null) begin\n      `uvm_fatal(\"CFG\", \"Configuration handle is null\")\n   end\n   \n   void'(uvm_config_db#(uvma_obi_memory_cntxt_c)::get(this, \"\", \"cntxt\", cntxt));\n   if (cntxt == null) begin\n      `uvm_fatal(\"CNTXT\", \"Context handle is null\")\n   end\n   \n   mon_trn_fifo       = new(\"mon_trn_fifo\"      , this);\n   mstr_seq_item_fifo = new(\"mstr_seq_item_fifo\", this);\n   slv_seq_item_fifo  = new(\"slv_seq_item_fifo\" , this);\n   \n   if (cfg.enabled && cfg.cov_model_enabled) begin\n      obi_cg = new(\"obi_cg\", \n                   .read_enabled(cfg.read_enabled), \n                   .write_enabled(cfg.write_enabled),\n                   .is_1p2(cfg.version >= UVMA_OBI_MEMORY_VERSION_1P2));\n      if (cfg.read_enabled)  rd_delay_cg = new(\"rd_delay_cg\");\n      if (cfg.write_enabled) wr_delay_cg = new(\"wr_delay_cg\");\n   end\n\nendfunction : build_phase\n//@DVT_LINTER_WAIVER_END \"MT20210901_1\"\n\ntask uvma_obi_memory_cov_model_c::run_phase(uvm_phase phase);\n   \n   super.run_phase(phase);\n   \n   if (cfg.enabled && cfg.cov_model_enabled) begin      \n      fork\n         // Configuration\n         forever begin\n            cntxt.sample_cfg_e.wait_trigger();\n            sample_cfg();\n         end\n         \n         // Context\n         forever begin\n            cntxt.sample_cntxt_e.wait_trigger();\n            sample_cntxt();\n         end\n         \n         // Monitor transactions\n         forever begin\n            uvma_obi_memory_mon_trn_c mon_trn;\n\n            mon_trn_fifo.get(mon_trn);\n            sample_mon_trn(mon_trn);\n         end\n         \n         // 'mstr' sequence items\n         forever begin\n            uvma_obi_memory_mstr_seq_item_c mstr_seq_item;\n\n            mstr_seq_item_fifo.get(mstr_seq_item);\n            sample_mstr_seq_item();\n         end\n         \n         // 'slv' sequence items\n         forever begin\n            uvma_obi_memory_slv_seq_item_c slv_seq_item;\n\n            slv_seq_item_fifo.get(slv_seq_item);\n            sample_slv_seq_item();\n         end\n      join_none\n   end\n   \nendtask : run_phase\n\n\nfunction void uvma_obi_memory_cov_model_c::sample_cfg();\n   \n   // TODO Implement uvma_obi_memory_cov_model_c::sample_cfg();\n   \nendfunction : sample_cfg\n\n\nfunction void uvma_obi_memory_cov_model_c::sample_cntxt();\n   \n   // TODO Implement uvma_obi_memory_cov_model_c::sample_cntxt();\n   \nendfunction : sample_cntxt\n\n\nfunction void uvma_obi_memory_cov_model_c::sample_mon_trn(uvma_obi_memory_mon_trn_c trn);\n   \n   obi_cg.sample(trn);\n   if (cfg.write_enabled) wr_delay_cg.sample(trn);   \n   if (cfg.read_enabled)  rd_delay_cg.sample(trn);   \n   \nendfunction : sample_mon_trn\n\n\nfunction void uvma_obi_memory_cov_model_c::sample_mstr_seq_item();\n   \n   // TODO Implement uvma_obi_memory_cov_model_c::sample_mstr_seq_item();\n   \nendfunction : sample_mstr_seq_item\n\n\nfunction void uvma_obi_memory_cov_model_c::sample_slv_seq_item();\n   \n   // TODO Implement uvma_obi_memory_cov_model_c::sample_slv_seq_item();\n   \nendfunction : sample_slv_seq_item\n\n\n`endif // __UVMA_OBI_MEMORY_COV_MODEL_SV__\n\n","lang":"verilog"};
processSrcData(g_data);